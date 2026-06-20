# HireFlow 🚀

### AI-Powered Career Management Platform

HireFlow is a full-stack microservices-based platform designed to help students, freshers, and job seekers streamline their job search journey. The platform enables users to manage applications, track progress, analyze performance, and receive personalized AI-powered career guidance.

Built using React, Node.js, MongoDB, Microservices Architecture, API Gateway, and Google Gemini AI.

---

## ✨ Features

### 🔐 Authentication & Authorization

* JWT-based authentication
* Secure login and registration
* Protected routes
* Gateway-level token verification
* Role-based access control ready

---

### 📋 Application Tracking

* Create job applications
* Update application status
* Delete applications
* Track interview progress
* Centralized application management

---

### 📊 Analytics Dashboard

* Total applications
* Interview rate analysis
* Offer conversion rate
* Application trends
* Top companies applied
* Career progress tracking

---

### 🤖 AI Career Assistant

* Personalized career guidance
* Context-aware AI responses
* Profile-based recommendations
* Dynamic prompt engineering
* Google Gemini AI integration

---

### 👤 Profile Management

Users can manage:

* Education
* Current role
* Target role
* Skills
* Experience
* LinkedIn profile
* GitHub profile
* Career preferences

---

### ⚡ Scalable Architecture

* API Gateway pattern
* Microservices architecture
* Independent services
* Service-level scalability
* Redis-ready caching layer

---

## 🏗️ System Architecture

```text
                    ┌──────────────┐
                    │   Frontend   │
                    │    React     │
                    └──────┬───────┘
                           │
                           ▼

                 ┌──────────────────┐
                 │   API Gateway    │
                 │ Authentication   │
                 │ Request Routing  │
                 └──────┬─────┬─────┘
                        │     │
        ┌───────────────┘     └───────────────┐
        ▼                                     ▼

 ┌──────────────┐                   ┌──────────────┐
 │ User Service │                   │ AI Service   │
 └──────┬───────┘                   └──────┬───────┘
        │                                  │
        ▼                                  ▼

 ┌──────────────┐                   ┌──────────────┐
 │ MongoDB      │                   │ Gemini AI    │
 └──────────────┘                   └──────────────┘

        ▲
        │
 ┌──────────────┐
 │ Analytics    │
 │ Service      │
 └──────────────┘
```

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Framer Motion
* React Router
* Lucide React

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Architecture

* API Gateway
* Microservices
* JWT Authentication
* Proxy Middleware

### AI

* Google Gemini AI
* Prompt Engineering
* Context-Based Recommendations

### Infrastructure

* Vercel
* Render
* MongoDB Atlas
* Upstash Redis (Planned)

---

## 📂 Project Structure

```text
HireFlow
│
├── frontend
│
├── gateway
│
├── services
│   ├── user-service
│   ├── application-service
│   ├── analytics-service
│   └── ai-service
│
└── docs
```

---

## 🤖 AI Context System

Unlike traditional chatbots, HireFlow generates personalized recommendations using:

* Education
* Experience
* Current role
* Target role
* Skills
* Career goals
* Application analytics

This enables context-aware career guidance tailored to individual users.

---

## 🚀 Getting Started

### Prerequisites

* Node.js 18+
* MongoDB Atlas or Local MongoDB
* Google Gemini API Key

### Installation

#### Clone Repository

```bash
git clone https://github.com/your-username/hireflow.git

cd hireflow
```

#### Install Frontend

```bash
cd frontend

npm install

npm run dev
```

#### Install Gateway

```bash
cd gateway

npm install

npm run dev
```

#### Install Services

```bash
cd services/user-service
npm install

cd ../application-service
npm install

cd ../analytics-service
npm install

cd ../ai-service
npm install
```

---

## 🔑 Environment Variables

Example:

```env
MONGO_URI=your_mongodb_uri

JWT_SECRET=your_secret

GEMINI_API_KEY=your_gemini_api_key

PORT=5000
```

Create a `.env` file inside each service where required.

---

## 🚀 Future Roadmap

### Phase 1

* ✅ Authentication
* ✅ Application Tracking
* ✅ Analytics Dashboard
* ✅ AI Assistant
* ✅ Profile Management

### Phase 2

* Resume Analysis
* AI Resume Builder
* Skill Gap Analysis
* Interview Preparation

### Phase 3

* Job Recommendations
* Resume Scoring
* GitHub Profile Analysis
* LeetCode Integration

### Phase 4

* Redis Caching
* AI Memory
* Recommendation Engine
* Agentic Workflows

---

## 📸 Screenshots

Add screenshots for:

* Landing Page
* Dashboard
* Analytics
* AI Career Assistant
* Profile Management
* Application Tracker

---

## 🎯 Key Learning Outcomes

* Microservices Architecture
* API Gateway Design
* JWT Authentication
* AI Integration with Gemini
* Scalable Backend Systems
* MongoDB Data Modeling
* Full-Stack Development
* Prompt Engineering

---

## 👨‍💻 Author

**Chirag Shetty**

* GitHub: https://github.com/chirag-165
* LinkedIn: https://linkedin.com/in/chirag-shetty-a1827a261

---

## ⭐ Project Vision

HireFlow aims to become an intelligent career management platform that not only tracks applications but actively helps users improve their career trajectory through AI-driven insights, recommendations, and personalized guidance.
