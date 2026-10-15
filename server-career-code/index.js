import express from 'express';
import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(
	cors({
		origin: ['http://localhost:5173'],
		credentials: true,
	}),
);
app.use(express.json());
app.use(cookieParser());

const verifyToken = (req, res, next) => {
	const token = req?.cookies?.token;
	console.log('cookie in the middleware', token);
	if (!token) {
		return res.status(401).send({ message: 'unauthorized access' });
	}
	// verify token
	jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
		if (err) {
			return res.status(401).send({ message: 'unauthorized access' });
		}
		req.decoded = decoded;
		next();
	});
};

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@database.7ldqh.mongodb.net/?appName=Database`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

const run = async () => {
	try {
		// Connect the client to the server	(optional starting in v4.7)
		await client.connect();

		const jobsCollection = client.db('careerDB').collection('jobs');
		const applicationsCollection = client
			.db('careerDB')
			.collection('applications');

		// jwt related api
		app.post('/jwt', async (req, res) => {
			const userData = req.body;
			const token = jwt.sign(userData, process.env.JWT_ACCESS_SECRET, {
				expiresIn: '1d',
			});
			res.cookie('token', token, {
				httpOnly: true,
				secure: false,
				sameSite: 'lax',
			});

			res.send({ success: true });
		});

		// jobs api
		app.get('/jobs', async (req, res) => {
			const email = req.query.email;
			const query = {};
			if (email) {
				query.hr_email = email;
			}
			const result = await jobsCollection.find(query).toArray();
			res.send(result);
		});

		app.post('/job', async (req, res) => {
			const newJob = req.body;
			const result = await jobsCollection.insertOne(newJob);
			res.send(result);
		});

		app.get('/jobs/applications', async (req, res) => {
			const email = req.query.email;
			const query = { hr_email: email };
			const jobs = await jobsCollection.find(query).toArray();
			// should use aggregate for optimum data fetching
			for (const job of jobs) {
				const applicationQuery = { jobId: job._id.toString() };
				const application_count =
					await applicationsCollection.countDocuments(applicationQuery);
				job.application_count = application_count;
			}
			res.send(jobs);
		});

		app.get('/jobs/:id', async (req, res) => {
			const id = req.params.id;
			const query = { _id: new ObjectId(id) };
			const result = await jobsCollection.findOne(query);
			res.send(result);
		});

		// jobs applications related api

		app.get('/applications', verifyToken, async (req, res) => {
			const applicantEmail = req.query.email;
			if (email !== req.decoded.email) {
				return res.status(403).send({ message: 'forbidden access' });
			}
			const query = {
				applicant: applicantEmail,
			};
			const result = await applicationsCollection.find(query).toArray();
			for (const application of result) {
				const jobId = application.jobId;
				const jobQuery = { _id: new ObjectId(jobId) };
				const job = await jobsCollection.findOne(jobQuery);
				application.company = job.company;
				application.company_logo = job.company_logo;
				application.title = job.title;
			}
			res.send(result);
		});

		app.get('/applications/job/:id', async (req, res) => {
			const id = req.params.id;
			const query = { jobId: id };
			const result = await applicationsCollection.find(query).toArray();
			res.send(result);
		});

		app.patch('/applications/:id', async (req, res) => {
			const id = req.params.id;
			const filter = { _id: new ObjectId(id) };
			const updatedDoc = {
				$set: {
					status: req.body.status,
				},
			};
			const result = await applicationsCollection.updateOne(filter, updatedDoc);
			res.send(result);
		});

		app.post('/applications', async (req, res) => {
			const application = req.body;
			const result = await applicationsCollection.insertOne(application);
			res.send(result);
		});

		// Send a ping to confirm a successful connection
		// await client.db('admin').command({ ping: 1 });
		// console.log(
		// 	'Pinged your deployment. You successfully connected to MongoDB!'
		// );
	} finally {
		// Ensures that the client will close when you finish/error
		// await client.close();
	}
};
run().catch(console.dir);

app.get('/', (req, res) => {
	res.send('career code server is running');
});

app.listen(port, () => {
	console.log(`Career code is running on port: ${port}`);
});
