package main

import (
	"compass/internal/metricsgroup"
	"fmt"
)

func transformFiltersToQuery(filters []metricsgroup.MetricFilter) string {
	filterQuery := "{"
	for index, filter := range filters {
		filterQuery += fmt.Sprintf(`%s%s"%s"`, filter.Field, filter.Operator, filter.Value)
		if (index + 1) < len(filters) {
			filterQuery += ","
		}
	}
	filterQuery += "}"
	return filterQuery
}

func createQueryByMetric(metric metricsgroup.Metric) string {
	return fmt.Sprintf("%s%s", metric.Metric, transformFiltersToQuery(metric.Filters))
}