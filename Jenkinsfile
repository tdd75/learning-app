pipeline{
    agent any
    stages{

        stage('Checkout'){
            steps{
                git branch: 'main', url: 'https://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@github.com/tdd75/learning-app.git'
            }
        }

        stage('Test'){
            steps{
                echo 'test'
            }
        }
            
        stage('Build'){
            steps{
                echo 'start build ...'

                sh 'docker-compose build'
                sh 'docker-compose push'
            }
        }
            
        stage('Deploy'){
            steps{
                echo 'start deploy ...'
            
                sh 'docker rm -f app-container-server-name || true' 
                sh 'docker rm -f app-container-client-name || true' 
                sh 'git clone https://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@github.com/tdd75/learning-app.git'
                sh 'mv ./learning-app/docker-compose.deploy.yml ./docker-compose.deploy.yml && rm -rf learning-app'
                sh 'docker-compose -f docker-compose.deploy.yml up -d'
            }
        }
    }
}