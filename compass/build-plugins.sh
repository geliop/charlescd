for each in ./plugins/datasource/*/ ; do go build -buildmode=plugin -o ./plugins "$each"*.go; done