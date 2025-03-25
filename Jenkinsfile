pipeline {
    agent any

    environment {
    NODE_VERSION = '20'
    BUILD_PATH = "${WORKSPACE}/dist/justice-love-peace/browser"
    DEPLOY_SERVER = "103.38.50.157"
    DEPLOY_USER = "CylSrv9Mgr"
    DEPLOY_PASS = "Dwu\$CakLy@515W"
    DEPLOY_PATH = "D:/website/Global_Justice/Global_Justice_WEB/globaljusticeuat.cylsys.com"
}

    stages {
        stage('Checkout Code') {
            steps {
                echo "🔍 Checking out UAT branch from GitHub"
                git branch: 'UAT', credentialsId: 'Github_Cylsys_Credentials', url: 'https://github.com/Saurabh-Cylsys/justice-love-peace.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install --legacy-peer-deps' // Install dependencies with legacy flag
            }
        }

        stage('Build Angular App') {
            steps {
                sh 'ng build --configuration=production' // Production build for Angular
            }
        }

        stage('Verify Build Output') {
            steps {
                script {
                    def buildExists = sh(script: "test -d ${BUILD_PATH} && echo 'exists'", returnStdout: true).trim()
                    if (buildExists != "exists") {
                        error "\u274c Build directory does not exist! Aborting deployment."
                    }
                }
            }
        }

        stage('Install SSHPass (if missing)') {
            steps {
                script {
                    def sshpassExists = sh(script: "command -v sshpass", returnStatus: true) == 0
                    if (!sshpassExists) {
                        sh 'sudo apt update && sudo apt install -y sshpass'
                    }
                }
            }
        }

        stage('Deploy to Windows Server') {
            steps {
                script {
                    sh '''
                        export SSHPASS="$DEPLOY_PASS"
                        sshpass -e scp -o StrictHostKeyChecking=no -r "$BUILD_PATH/." "$DEPLOY_USER@$DEPLOY_SERVER:$DEPLOY_PATH"
                    '''
                }
            }
        }
    }

    post {
        success {
            echo '✅ Deployment Successful!'
        }
        failure {
            echo '❌ Deployment Failed!'
        }
    }
}
