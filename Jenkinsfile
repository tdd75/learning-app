pipeline{
    agent any
    stages{

        stage('Checkout'){
            steps{
                git branch: 'main', url: 'https://github.com/tdd75/learning-app'
            }
        }

        stage('Test'){
            steps{
                echo 'test'
            }
        }
            
        stage('Build'){
            steps{
                withDockerRegistry(credentialsId: 'docker-hub-duytd', url: 'https://index.docker.io/v1/') {
                    
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
                    sh 'ssh -o StrictHostKeyChecking=no -l long 13.70.60.235 "docker stop app-container-server-name  || true && docker rm -f app-container-server-name || true"' 
                    sh 'ssh -o StrictHostKeyChecking=no -l long 13.70.60.235 "docker stop app-container-client-name || true && docker rm -f app-container-client-name || true"' 
                    sh 'ssh -o StrictHostKeyChecking=no -l long 13.70.60.235 "git clone https://github.com/tdd75/learning-app"'
                    sh 'ssh -o StrictHostKeyChecking=no -l long 13.70.60.235 "mv ./learning-app/docker-compose.deploy.yml ./docker-compose.deploy.yml && rm -rf learning-app"'
                    sh 'ssh -o StrictHostKeyChecking=no -l long 13.70.60.235 "docker-compose -f docker-compose.deploy.yml up -d"'
                }
            }
        }
    }
}