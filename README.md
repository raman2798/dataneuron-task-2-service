# DataNeuron Task 2 Service

This is the repository for the DataNeuron Task 2 Service.

## Getting Started

### Installation Instructions

1. Clone the repository:

```bash
git clone https://github.com/raman2798/dataneuron-task-2-service.git

cd dataneuron-task-2-service
```

2. Install node and npm

3. Install dependencies:

```
npm install
```

4. Set the environment variables:

```bash
cp .env.sample .env

# Open .env and modify the environment variables if needed
```

### Starting the Server

To start the server on localhost, run:

```bash
npm run start
```

## Project Structure

```
src/
 |--config/             # Environment variables and configuration related things
 |--controllers/        # Route controllers (controller layer)
 |--docs/               # All swagger docs
 |--enums/              # All common enums
 |--interfaces/         # All common interfaces
 |--middlewares/        # All middlewares
 |--models/             # All models
 |--routes/             # All routes
 |--services/           # All services
 |--utils/              # All utils
 |--validations/        # All api validations
 |--index.ts            # App entry point
```
