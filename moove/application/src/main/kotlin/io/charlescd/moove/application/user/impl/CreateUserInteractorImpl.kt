package io.charlescd.moove.application.user.impl

import io.charlescd.moove.application.UserService
import io.charlescd.moove.application.user.CreateUserInteractor
import io.charlescd.moove.application.user.request.CreateUserRequest
import io.charlescd.moove.application.user.response.UserResponse
import io.charlescd.moove.domain.User
import io.charlescd.moove.domain.exceptions.UnauthorizedException
import io.charlescd.moove.domain.service.KeycloakService
import javax.inject.Inject
import javax.inject.Named

@Named
class CreateUserInteractorImpl @Inject constructor(
    private val userService: UserService,
    private val keycloakService: KeycloakService
) : CreateUserInteractor {

    override fun execute(createUserRequest: CreateUserRequest, authorization: String): UserResponse {
        val user = createUserRequest.toUser()
        verifyPermissionToCreate(user, authorization)

        userService.checkIfEmailAlreadyExists(user)
        userService.save(user)

        this.keycloakService.createUser(
            user.email,
            user.name,
            createUserRequest.password,
            user.root
        )

        return UserResponse.from(user)
    }

    private fun verifyPermissionToCreate(newUser: User, authorization: String) {
        val parsedEmail = keycloakService.getEmailByAccessToken(authorization)
        val user = userService.findByEmail(parsedEmail)
        if (!user.root) {
            if (parsedEmail != newUser.email) {
                throw UnauthorizedException()
            }
        }
    }
}
