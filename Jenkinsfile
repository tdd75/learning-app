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
                withDockerRegistry(credentialsId: 'tdd75-dockerhub', url: 'https://index.docker.io/v1/') {
                    
                    echo 'start build ...'

                    sh 'docker-compose build'
                    sh 'docker-compose push'

                }
            }
        }
            
        stage('Deploy'){
            steps{
                echo 'start deploy ...'
                
                sshagent(['ssh-remote']){
                    sh 'ssh -o StrictHostKeyChecking=no -l tdd75 20.187.70.255 "docker rm -f app-container-server-name || true"' 
                    sh 'ssh -o StrictHostKeyChecking=no -l tdd75 20.187.70.255 "docker rm -f app-container-client-name || true"' 
                    sh 'ssh -o StrictHostKeyChecking=no -l tdd75 20.187.70.255 "git clone https://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@github.com/tdd75/learning-app.git"'
                    sh 'ssh -o StrictHostKeyChecking=no -l tdd75 20.187.70.255 "mv ./learning-app/docker-compose.deploy.yml ./docker-compose.deploy.yml && rm -rf learning-app"'
                    sh 'ssh -o StrictHostKeyChecking=no -l tdd75 20.187.70.255 "docker-compose -f docker-compose.deploy.yml up -d"'
                }
            }
        }
    }
}