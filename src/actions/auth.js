import { get, post } from 'api'
import Cookies from 'js-cookie'
import * as types from './types.js'
import { history } from 'store'
import { setAlert } from 'actions/design'

export const loginAsGuest = redirect => dispatch => 
    (
        get('guest').then(json => {
            if (json.apikey) {
                dispatch(setToken(json.apikey.key, true))
                dispatch(setUser(json.user))
                if (redirect) {
                    history.push('/')
                }
            }
        })
    )

export const login = data => dispatch => 
    (
        post('login', false, data).then(json => {
            if (json.status === 401) {
                dispatch(setAlert('Credenciais inválidas', 'error'))
            }

            if (json.apikey) {
                dispatch(setToken(json.apikey.key, false))
                dispatch(setUser(json.user))
                return true
            }
        })
    )

export const logout = () => dispatch => 
    (
        get('logout', true).then(json => {
            dispatch(loginAsGuest(true))
        })
    )

export const keepToken = () => dispatch => 
    (
        get('api/keeptoken').then(json => {
            if (json.apikey) {
                dispatch(setToken(json.apikey.key, json.user.first_name === 'Guest'))
                dispatch(setUser(json.user))
            }
        })
        .catch(error => {
            dispatch(loginAsGuest())
        })
    )

export const registration = data => dispatch => 
    (
        post('signup/client', true, data).then(json => {
            if (json.object) {
                history.push('/')
            }
        })
    )

export const resetPassword = data => dispatch => 
    (
        post('reset-password/request', true, data).then(json => {
            console.log(json)
        })
    )

export const checkHash = data => dispatch => 
    (
        post(`reset-password/confirm/${data.hash}`, true, {new_password: data.password}).then(json => {
            console.log(json)
        })
    )

export const setUser = data => {
    if (!data.user_image) {
        data.user_image = {}
    }
    return {
        type: types.SET_USER,
        data
    }
}

export const setToken = (value, guest) => {
    Cookies.set('token', value)
    Cookies.set('guest', guest)
    return {
        type: types.SET_TOKEN,
        value,
        guest
    }
}