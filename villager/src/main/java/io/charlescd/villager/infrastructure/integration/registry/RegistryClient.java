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

package io.charlescd.villager.infrastructure.integration.registry;

import io.charlescd.villager.infrastructure.persistence.DockerRegistryConfigurationEntity;
import java.io.Closeable;
import java.util.Optional;
import javax.ws.rs.core.Response;

public interface RegistryClient extends Closeable {

    void configureAuthentication(RegistryType type,
                                 DockerRegistryConfigurationEntity.DockerRegistryConnectionData config);

    Optional<Response> getImage(String name, String tagName,
                                DockerRegistryConfigurationEntity.DockerRegistryConnectionData connectionData);

    void closeQuietly();

}
