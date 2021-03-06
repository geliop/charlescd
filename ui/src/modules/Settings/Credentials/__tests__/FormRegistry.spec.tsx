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
import { render, fireEvent, wait, act, cleanup } from 'unit-test/testUtils';
import FormRegistry from '../Sections/Registry/Form';
import MutationObserver from 'mutation-observer';
import { Props as AceEditorprops } from 'core/components/Form/AceEditor';
import { Controller as MockController } from 'react-hook-form';

(global as any).MutationObserver = MutationObserver;

const mockOnFinish = jest.fn();
const mockSave = jest.fn();

afterEach(() => {
  mockSave.mockClear();
});

jest.mock('../Sections/Registry/hooks', () => {
  return {
    __esModule: true,
    useRegistry: () => ({
      save: mockSave,
    })
  };
});

jest.mock('core/components/Form/AceEditor', () => {
  return {
    __esModule: true,
    A: true,
    default: ({
      control,
      rules,
      name,
      className,
      defaultValue
    }: AceEditorprops) => {
      return (
        <MockController
          as={
            <textarea name={name} data-testid={`input-text-${name}`}></textarea>
          }
          rules={rules}
          name={name}
          control={control}
          className={className}
          defaultValue={defaultValue}
        />
      );
    }
  };
});

test('render Registry form default component', async () => {
  const { container } = render(
    <FormRegistry onFinish={mockOnFinish}/>
  );

  await wait();
  expect(container.innerHTML).toMatch("test");
});

test('render Registry form with azure values', async () => {
  const { container, getByTestId } = render(
    <FormRegistry onFinish={mockOnFinish}/>
  );

  await wait();
  const radioButton = getByTestId("radio-group-registry-item-AZURE");
  fireEvent.click(radioButton)
  await wait();
  expect(container.innerHTML).toMatch("Enter the username");
});

test('render Registry form with AWS values', async () => {
  const { container, getByTestId } = render(
    <FormRegistry onFinish={mockOnFinish}/>
  );

  await wait();
  const radioButton = getByTestId("radio-group-registry-item-AWS");
  fireEvent.click(radioButton)
  await wait();
  expect(container.innerHTML).toMatch("Enter the region");
});

test('render Registry form with AWS values and secret input', async () => {
    const { container, getByTestId } = render(
      <FormRegistry onFinish={mockOnFinish}/>
    );
  
    await wait();
    const radioButton = getByTestId("radio-group-registry-item-AWS");
    fireEvent.click(radioButton)
    await wait();
    const radioAuthButton = getByTestId("switch-aws-auth-handler")
    fireEvent.click(radioAuthButton)
    expect(container.innerHTML).toMatch("Enter the access key");
});


test('render Registry form without AWS values and secret input', async () => {
    const { container, getByTestId } = render(
      <FormRegistry onFinish={mockOnFinish}/>
    );
  
    await wait();
    const radioButton = getByTestId("radio-group-registry-item-AWS");
    fireEvent.click(radioButton)
    await wait();
    expect(container.innerHTML).not.toMatch("Enter the access key");
});

test('render Registry form with GCP form', async () => {
  const { container, getByTestId } = render(
    <FormRegistry onFinish={mockOnFinish} />
  );

  await wait();
  const radioButton = getByTestId('radio-group-registry-item-GCP');
  fireEvent.click(radioButton);
  await wait();
  expect(container.innerHTML).toMatch('organization');
});

test('Not trigger onSubmit on json parse error with GCP form', async () => {
  const { container, getByTestId, getByText } = render(
    <FormRegistry onFinish={mockOnFinish} />
  );

  await wait();
  const radioButton = getByTestId('radio-group-registry-item-GCP');
  fireEvent.click(radioButton);
  await wait();
  const inputGCPName = getByTestId('input-text-name');
  const inputGCPAddress = getByTestId('input-text-address');
  const inputGCPOrganization = getByTestId('input-text-organization');
  const inputGCPJsonKey = getByTestId('input-text-jsonKey');
  const submitButton = getByTestId('button-default-submit-registry');
  await act(async () => {
    fireEvent.change(inputGCPName, { target: { value: 'fake-name' } });
    fireEvent.change(inputGCPAddress, {
      target: { value: 'http://fake-host' }
    });
    fireEvent.change(inputGCPOrganization, {
      target: { value: 'fake-access-key' }
    });
    fireEvent.change(inputGCPJsonKey, { target: { value: 'te' } });
    fireEvent.click(submitButton);
  });
  expect(mockSave).toBeCalledTimes(0);
});

test('Trigger submit on json parse success with GCP form', async () => {
  const { container, getByTestId, getByText } = render(
    <FormRegistry onFinish={mockOnFinish} />
  );

  await wait();
  const radioButton = getByTestId('radio-group-registry-item-GCP');
  fireEvent.click(radioButton);
  await wait();
  const inputGCPName = getByTestId('input-text-name');
  const inputGCPAddress = getByTestId('input-text-address');
  const inputGCPOrganization = getByTestId('input-text-organization');
  const inputGCPJsonKey = getByTestId('input-text-jsonKey');
  const submitButton = getByTestId('button-default-submit-registry');
  await act(async () => {
    fireEvent.change(inputGCPName, { target: { value: 'fake-name' } });
    fireEvent.change(inputGCPAddress, {
      target: { value: 'http://fake-host' }
    });
    fireEvent.change(inputGCPOrganization, {
      target: { value: 'fake-access-key' }
    });
    fireEvent.change(inputGCPJsonKey, {
      target: { value: '{ "testKey": "testValue"}' }
    });
    fireEvent.click(submitButton);
  });
  expect(mockSave).toBeCalledTimes(1);
});

test('execute onSubmit', async () => {
  const { container, getByTestId } = render(
    <FormRegistry onFinish={mockOnFinish}/>
  );

  await wait();
  const radioButton = getByTestId("radio-group-registry-item-AWS");
  fireEvent.click(radioButton)
  await wait();
  const radioAuthButton = getByTestId("switch-aws-auth-handler");
  fireEvent.click(radioAuthButton);
  await wait();
  const inputAwsName = getByTestId("input-text-name");
  const inputAwsAddress = getByTestId("input-text-address");
  const inputAwsAccessKey = getByTestId("input-password-accessKey");
  const inputAwsSecretKey = getByTestId("input-text-secretKey");
  const inputAwsRegion = getByTestId("input-text-region");
  const submitButton = getByTestId("button-default-submit-registry")

  await act(async () => {
    fireEvent.change(inputAwsName, {target: {value: "fake-name"}})
    fireEvent.change(inputAwsAddress, {target: {value: "http://fake-host"}})
    fireEvent.change(inputAwsAccessKey, {target: {value: "fake-access-key"}})
    fireEvent.change(inputAwsSecretKey, {target: {value: "fake-secret-key"}})
    fireEvent.change(inputAwsRegion, {target: {value: "fake-region"}})
    fireEvent.click(submitButton)
  })

  expect(mockSave).toBeCalledTimes(1);
});

test('should not execute onSubmit because validation (missing name)', async () => {
  const { container, getByTestId } = render(
    <FormRegistry onFinish={mockOnFinish}/>
  );

  await wait();
  const radioButton = getByTestId("radio-group-registry-item-AWS");
  fireEvent.click(radioButton)
  await wait();
  const radioAuthButton = getByTestId("switch-aws-auth-handler");
  fireEvent.click(radioAuthButton);
  await wait();
  const inputAwsAddress = getByTestId("input-text-address");
  const inputAwsAccessKey = getByTestId("input-password-accessKey");
  const inputAwsSecretKey = getByTestId("input-text-secretKey");
  const inputAwsRegion = getByTestId("input-text-region");
  const submitButton = getByTestId("button-default-submit-registry")

  await act(async () => {
    fireEvent.change(inputAwsAddress, {target: {value: "http://fake-host"}})
    fireEvent.change(inputAwsAccessKey, {target: {value: "fake-access-key"}})
    fireEvent.change(inputAwsSecretKey, {target: {value: "fake-secret-key"}})
    fireEvent.change(inputAwsRegion, {target: {value: "fake-region"}})
    fireEvent.click(submitButton)
  })

  expect(mockSave).toBeCalledTimes(0);
});
