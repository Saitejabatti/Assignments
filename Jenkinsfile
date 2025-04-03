pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/Saitejabatti/your-node-app.git'
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
                sshagent(['ssh-server-creds']) {
                    sh 'scp -r ./dist ubuntu@3.95.67.153 :/var/www/html'
                    sh 'ssh ubuntu@3.95.67.153 "systemctl restart nginx"'
                }
            }
        }
    }
}  // This closing brace was missing
