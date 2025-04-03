pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/your-repo/your-node-app.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Package') {
            steps {
                sh 'npm run build'  // Creates a /dist folder
            }
        }

        stage('Deploy') {
            steps {
                sh 'scp -r ./dist user@server:/var/www/html'  // Deploy via SSH
            }
        }
    }
}
