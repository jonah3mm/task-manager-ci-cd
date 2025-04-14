pipeline {
  agent any
  environment {
    IMAGE_FRONTEND = 'Jonah3mm/task-manager-app-frontend'
    IMAGE_BACKEND  = 'Jonah3mm/task-manager-app-backend'
  }
  stages {
    stage('Checkout') {
      steps {
        // Pull code from your Git repository
        checkout scm
      }
    }
    stage('Build Frontend Image') {
      steps {
        echo 'Building Frontend Docker Image...'
        sh 'docker build -t ${IMAGE_FRONTEND}:latest ./task-manager-frontend'
      }
    }
    stage('Build Backend Image') {
      steps {
        echo 'Building Backend Docker Image...'
        sh 'docker build -t ${IMAGE_BACKEND}:latest ./backend-test'
      }
    }
    stage('Test') {
      steps {
        echo "Running tests (add your test commands here if needed)!"
      }
    }
    stage('Push Images') {
      steps {
        echo "Pushing images to Docker Hub..."
        // Replace with your secure Docker Hub login mechanism.
        sh 'docker login -u Jonah3mm -p Jonah@123'
        sh 'docker push ${IMAGE_FRONTEND}:latest'
        sh 'docker push ${IMAGE_BACKEND}:latest'
      }
    }
    stage('Deploy') {
      steps {
        echo 'Deployment triggered!'
        // You can trigger a deployment script here.
      }
    }
  }
  post {
    always {
      echo 'Pipeline execution completed!'
    }
  }
}

