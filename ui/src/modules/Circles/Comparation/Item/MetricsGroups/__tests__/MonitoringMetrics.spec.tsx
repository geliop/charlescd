/*
 * Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import { render, screen, wait } from 'unit-test/testUtils';
import { FetchMock } from 'jest-fetch-mock';
import { MetricsGroupChartData } from './fixtures';
import MonitoringMetrics from '../MonitoringMetrics';

beforeEach(() => {
  (fetch as FetchMock).resetMocks();
});

test('render Monitoring Metrics with data', async () => {
  (fetch as FetchMock).mockResponseOnce(JSON.stringify(MetricsGroupChartData));
  
  render(<MonitoringMetrics metricsGroupId={'1'} />);

  await wait();

  expect(screen.getByTestId('monitoring-metrics')).toBeInTheDocument();
  expect(screen.getByTestId('apexcharts-mock')).toBeInTheDocument();
  expect(screen.getByTestId('monitoring-metrics-period-filter')).toBeInTheDocument();
});
