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

import React from "react";
import { render, fireEvent, wait } from 'unit-test/testUtils';
import Components from "../Components";
import { Component } from "modules/Modules/interfaces/Component";

const fakeComponent: Component = {
  id: "fake-id",
  name: "fake-name",
  latencyThreshold: "30",
  errorThreshold: "30",
  hostValue: "fakeHost",
  gatewayName: "fakeGateway"
};

const mockRemove = jest.fn();

const arrayFakeComponents = [fakeComponent, fakeComponent]

const arrayFakeComponent = [fakeComponent, fakeComponent]


const mockAppend = jest.fn(() => {
  arrayFakeComponents.push(fakeComponent)
});

jest.mock("react-hook-form", () => {
  return {
    __esModule: true,
    useFormContext: () => ({
      register: () => {},
      unregister: () => {}
    })
  };
});

test("Test componentForm for one component render", async () => {
  const { container } = render(
    <Components
      fieldArray={{
        append: mockAppend,
        remove: mockRemove,
        fields: arrayFakeComponent
      }}
      key={"fake-key"}
    />
  );
  await wait()
  expect(container.innerHTML).toMatch("input-wrapper-components[0]");
});

test("Test componentForm for two components render", async () => {
  const { container } = render(
    <Components
      fieldArray={{
        append: mockAppend,
        remove: mockRemove,
        fields: arrayFakeComponents
      }}
      key={"fake-key"}
    />
  );
  await wait()
  expect(container.innerHTML).toMatch("input-wrapper-components[0]");
  expect(container.innerHTML).toMatch("input-wrapper-components[1]");
});


test("Test componentForm for append another component", async () => {
  const { container, getByTestId, rerender } = render(
    <Components
      fieldArray={{
        append: mockAppend,
        remove: mockRemove,
        fields: arrayFakeComponents
      }}
      key={"fake-key"}
    />
  );
  await wait()
  const buttonAppend = getByTestId("button-default-add-component")
  fireEvent.click(buttonAppend)
  await wait()
  rerender(
    <Components
      fieldArray={{
        append: mockAppend,
        remove: mockRemove,
        fields: arrayFakeComponents
      }}
      key={"fake-key"}
    />
  );
  await wait()
  expect(container.innerHTML).toMatch("input-wrapper-components[0]");
  expect(container.innerHTML).toMatch("input-wrapper-components[1]");
  expect(container.innerHTML).toMatch("input-wrapper-components[2]");
});
