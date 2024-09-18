# Fanfare Toxic Text Detection Micro Service

## Table of Contents

- [Installation](#Installation)
- [Configuration](#configuration)
- [Running the Project](#running-the-project)
- [Starting Corn Services](#starting-cron-services)
- [Running Tests](#running-tests)
- [Authors](#authors)
- [License](#license)

## Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/FanFareBD/toxic-text-detection-micro-service
   ```

2. **Go to the project directory**
   ```sh
   cd Toxic Text Detection Service
   ```
3. **Install dependencies**

   Make sure you have Node.js installed. Then run:

   ```sh
   npm install
   ```

## Configurations

1. **Environment Variables**

   Create a `.env` file in the root of the project and add necessary environment variables given below:

   ```sh
   PORT=
   MONGO_URI=
   TOXIC_TEXT_DETECTION_API="toxic-text-ai-model-url/predict"
   TOXIC_TEXT_PUBLICATION_API="ff-backend-url/toxic-text-detection/fanfare-backend-ttd-publication"
   ```

## Running the Project

1. **Build the development Server**

   ```sh
   npm run build

   ```

2. **Start the development Server**

   ```sh
   npm run start

   ```

   ***

   **OR**

   ***

3. **Build and Start the Development Server Concurrently**

   ```sh
   npm run dev

   ```

   You can see in server log

   `Toxic Text Detection Micro Service has started on port http://localhost:YOUR_PORT`

## Starting Cron Jobs

#### Starting Ttd Processor Job

```http
  GET /ttd-processor/start
```

#### Stopping Ttd Processor Job

```http
  GET /ttd-processor/stop
```

#### Starting Ttd Publisher Job

```http
  GET /ttd-publisher/start
```

#### Stopping Ttd Publisher Job

```http
  GET /ttd-publisher/stop
```

## Authors

- [Md Taukir Alam](https://github.com/NullPointError07)
