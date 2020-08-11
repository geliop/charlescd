package metricsgroup

import (
	"compass/internal/util"
	"encoding/json"
	"errors"
	"io"

	"github.com/google/uuid"
)

type Metric struct {
	util.BaseModel
	MetricsGroupID uuid.UUID       `json:"metricGroupId"`
	DataSourceID   uuid.UUID       `json:"dataSourceId"`
	Metric         string          `json:"metric"`
	Filters        []MetricFilter  `json:"filters"`
	GroupBy        []MetricGroupBy `json:"groupBy"`
	Condition      string          `json:"condition"`
	Threshold      float64         `json:"threshold"`
}

type MetricFilter struct {
	util.BaseModel
	MetricID uuid.UUID
	Field    string `json:"field"`
	Value    string `json:"value"`
	Operator string `json:"operator"`
}

type MetricGroupBy struct {
	util.BaseModel
	Field string `json:"field"`
}

func (metric Metric) Validate() error {
	if metric.Metric == "" {
		return errors.New("Metric name is required")
	}

	if metric.Condition == "" {
		return errors.New("Metric Condition is required")
	}

	if metric.Threshold == 0 {
		return errors.New("Metric Threshold is required")
	}

	return nil
}

func (main Main) ParseMetric(metric io.ReadCloser) (Metric, error) {
	var newMetric *Metric
	err := json.NewDecoder(metric).Decode(&newMetric)
	if err != nil {
		return Metric{}, err
	}
	return *newMetric, nil
}

func (main Main) SaveMetric(metric Metric) (Metric, error) {
	db := main.db.Create(&metric)
	if db.Error != nil {
		return Metric{}, db.Error
	}
	return metric, nil
}

func (main Main) UpdateMetric(id string, metric Metric) (Metric, error) {
	db := main.db.Table("metrics").Where("id = ?", id).Update(&metric)
	if db.Error != nil {
		return Metric{}, db.Error
	}
	return metric, nil
}

func (main Main) RemoveMetric(id string) error {
	db := main.db.Where("id = ?", id).Delete(Metric{})
	if db.Error != nil {
		return db.Error
	}
	return nil
}