pipeline {
  agent any
  stages {
    stage('update files') {
      steps {
        script {
          if (env.BRANCH_NAME == 'cleanup') {
            dir(path: 'c:/users/lenovo/desktop/dynagrid') {
              bat "git pull https://eb2eb8995fd97fa2c5f31aab23b0cd798e2f3505@github.com/silevis/dynagrid.git cleanup"
            }
          }
        }
      }
    }
  }

  options {
    disableConcurrentBuilds()
  }

  post {
    cleanup {
      /* clean up our workspace */
      deleteDir()
      dir("${workspace}@tmp") {
        deleteDir()
      }
      dir("${workspace}@script") {
        deleteDir()
      }
      dir("${workspace}@script@tmp") {
        deleteDir()
      }
    }

    failure {
      emailext(to: 'piotr.mikosza@silevis.com', subject: "${env.JOB_NAME} ended with failure!", body: "Somethin was wrong! \n\nConsole: ${env.BUILD_URL}.\n\n")
    }
  }

  tools {
    nodejs 'node-v10.15.3'
  }
}