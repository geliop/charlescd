package main

import (
	"compass/internal/configuration"
	"compass/internal/datasource"
	"compass/internal/dispatcher"
	"compass/internal/metric"
	"compass/internal/metricsgroup"
	"compass/internal/plugin"
	"log"

	utils "compass/internal/util"
	v1 "compass/web/api/v1"

	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load()

	db, err := configuration.GetDBConnection("migrations")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	if utils.IsDeveloperRunning() {
		db.LogMode(true)
	}

	pluginMain := plugin.NewMain(db)
	datasourceMain := datasource.NewMain(db, pluginMain)
	metricMain := metric.NewMain(db, datasourceMain, pluginMain)
	metricsgroupMain := metricsgroup.NewMain(db, metricMain, datasourceMain, pluginMain)
	dispatcher := dispatcher.NewDispatcher(metricMain)

	go dispatcher.Start()

	v1 := v1.NewV1()
	v1.NewPluginApi(pluginMain)
	v1.NewMetricsGroupApi(metricsgroupMain)
	v1.NewMetricApi(metricMain, metricsgroupMain)
	v1.NewDataSourceApi(datasourceMain)
	v1.NewCircleApi(metricsgroupMain)
	v1.Start()
}
