pipeline {
  agent any;
  stages {
<<<<<<< Updated upstream
    stage('pull changes') {
      steps {
        script {
          if (env.BRANCH_NAME == 'cleanup') {
            dir(path: 'c:/users/lenovo/desktop/dynagrid') {
              bat 'git pull https://eb2eb8995fd97fa2c5f31aab23b0cd798e2f3505@github.com/silevis/dynagrid.git cleanup';
            }
=======
    stage('npm install') {
      steps {
        if (env.CHANGE_ID) {
          bat 'npm install';
        }
      }
    }

    stage('docker main stop') {
      steps {
        if (env.CHANGE_ID) {
          bat 'docker stop dynagrid';
        }
      }
    }

    stage('docker test build') {
      steps {
        script {
          if (env.CHANGE_ID) {
            bat 'docker build -t dynagrid-test:dynagrid-test .';
          }
        }
      }
    }

    stage('docker test run') {
      steps {
        script {
          if (env.CHANGE_ID) {
            bat 'docker run -d -p 3000:3000 --rm --name dynagrid-test dynagrid-test:dynagrid-test';
>>>>>>> Stashed changes
          }
        }
      }
    }

    stage('npm install') {
      steps {
        script {
<<<<<<< Updated upstream
          if (env.BRANCH_NAME == 'cleanup') {
            dir(path: 'c:/users/lenovo/desktop/dynagrid') {
              bat 'npm install';
            }
=======
          if (env.CHANGE_ID) {
            bat 'npm run test:automatic';
>>>>>>> Stashed changes
          }
        }
      }
    }

    stage('test') {
      steps {
<<<<<<< Updated upstream
        script {
          if (env.BRANCH_NAME == 'cleanup') {
            dir(path: 'c:/users/lenovo/desktop/dynagrid') {
              bat 'npm run test:automatic';
            }
=======
        scrips {
          if (env.CHANGE_ID) {
            bat 'docker stop dynagrid-test';
>>>>>>> Stashed changes
          }
        }
      }
    }
  }

  options {
    disableConcurrentBuilds();
  }

  post {
<<<<<<< Updated upstream
    cleanup {
      /* clean up our workspace */
      deleteDir()
      dir("${workspace}@tmp") {
        deleteDir();
      }
      dir("${workspace}@script") {
        deleteDir();
      }
      dir("${workspace}@script@tmp") {
        deleteDir();
      }
    }

=======
    success {
      script {
        if (env.BRANCH_NAME == 'cleanup') {
          dir(path: 'c:/users/lenovo/desktop/dynagrid') {
            bat 'docker stop dynagrid';
            bat 'git pull https://eb2eb8995fd97fa2c5f31aab23b0cd798e2f3505@github.com/silevis/dynagrid.git cleanup';
            bat 'docker build -t dynagrid:dynagrid .';
          }
        }
        bat 'docker run -d -p 3000:3000 --rm --name dynagrid dynagrid:dynagrid';
      }
    }

    cleanup {
      /* clean up our workspace */
      deleteDir()
      dir("${workspace}@tmp") {
        deleteDir();
      }
      dir("${workspace}@script") {
        deleteDir();
      }
      dir("${workspace}@script@tmp") {
        deleteDir();
      }
    }

>>>>>>> Stashed changes
    failure {
      script {
        bat 'docker stop dynagrid-test';
        bat 'docker run -d -p 3000:3000 --rm --name dynagrid dynagrid:dynagrid';
      }
      emailext(to: 'piotr.mikosza@silevis.com', subject: "${env.JOB_NAME} ended with failure!", body: "Somethin was wrong! \n\nConsole: ${env.BUILD_URL}.\n\n");
    }
  }

  tools {
    nodejs 'node-v10.15.3';
  }
}