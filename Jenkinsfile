pipeline {
    agent any
    
    parameters {
        choice(
            name: 'BRANCH_NAME',
            choices: ['main'], // Only include branches that exist
            description: 'Select branch to build'
        )
        string(
            name: 'BUILD_VERSION',
            defaultValue: '1.0.0',
            description: 'Build version number'
        )
        booleanParam(
            name: 'DEPLOY_TO_SERVER',
            defaultValue: false,
            description: 'Check to deploy files to server'
        )
    }

    stages {
        stage('Checkout') {
            steps {
                git(
                    branch: params.BRANCH_NAME,
                    url: 'https://github.com/Saitejabatti/Assignments.git',
                    credentialsId: 'github-creds' // Make sure this credential exists
                )
            }
        }
        
        stage('Verify Files') {
            steps {
                sh '''
                    echo "Building version ${BUILD_VERSION}"
                    echo "Repository contents:"
                    ls -la
                    echo "--- index.html content ---"
                    cat index.html || echo "No index.html found"
                '''
            }
        }
        
        stage('Package') {
            steps {
                sh '''
                    echo "Creating deployment package..."
                    mkdir -p dist
                    cp index.html dist/ || echo "No index.html to copy"
                    cp README* dist/ || echo "No README to copy"
                    zip -r deploy-${BUILD_VERSION}.zip dist/
                '''
                archiveArtifacts artifacts: 'deploy-*.zip', fingerprint: true
            }
        }
        
        stage('Deploy') {
            when {
                expression { params.DEPLOY_TO_SERVER == true }
            }
            steps {
                sshagent(['ssh-server-creds']) {
                    sh '''
                        echo "Deploying files to server..."
                        scp -r dist/* ubuntu@3.95.67.153:/var/www/html/
                        scp deploy-${BUILD_VERSION}.zip ubuntu@3.95.67.153:/backups/
                    '''
                }
            }
        }
    }
    
    post {
        always {
            echo "Pipeline completed for ${params.BUILD_VERSION}"
        }
        success {
            echo "Build succeeded! Artifacts available in Jenkins"
        }
        failure {
            echo "Build failed! Check logs for errors"
        }
    }
}
