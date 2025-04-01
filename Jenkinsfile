pipeline {
    agent any
    environment {
        NODE_VERSION = '20'
        BUILD_PATH = "${WORKSPACE}/dist/justice-love-peace/browser"
        DEPLOY_SERVER = "103.38.50.157"
        DEPLOY_USER = "CylSrv9Mgr"
        DEPLOY_PASS = "Dwu\$CakLy@515W"
        DEPLOY_PATH = "D:/CI_CD/test_angular/"
    }

    stages {
        stage('Checkout UAT Branch') {
            steps {
                echo "🔍 Forcing clean checkout of UAT branch"
                deleteDir() // Wipe workspace before checkout
                git branch: 'UAT', credentialsId: 'Github_Cylsys_Credentials', url: 'https://github.com/Saurabh-Cylsys/justice-love-peace.git'
                echo "✅ Checkout complete"
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "\uD83D\uDCB6 Installing Node.js Dependencies"
                sh 'npm install --legacy-peer-deps'
            }
        }

        stage('Build Angular App') {
            steps {
                echo "\uD83C\uDFE0 Building Angular Application"
                sh 'ng build --configuration=production'
            }
        }

        stage('Verify Build Output') {
            steps {
                echo "\u2705 Verifying Build Directory"
                script {
                    if (!fileExists(BUILD_PATH)) {
                        error "\u274C Build directory not found: ${BUILD_PATH}"
                    }
                }
            }
        }

        stage('Deploy to Server') {
            steps {
                echo "\uD83D\uDE80 Deploying to UAT Server"
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
					emailext(
                        subject: "Test Email from Jenkins",
                        body: "Deployment Successful.",
                        to: "priyanshu.sahu@cylsys.com"
        }
        failure {
            echo '✅ Deployment Failed!'
					emailext(
                        subject: "Test Email from Jenkins",
                        body: "Deployment failed.",
                        to: "priyanshu.sahu@cylsys.com"
        }
    }
}
