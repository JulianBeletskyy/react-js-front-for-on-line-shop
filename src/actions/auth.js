import { get, post } from 'api'
import Cookies from 'js-cookie'
import * as types from './types.js'
import { history } from 'store'

export const loginAsGuest = () => dispatch => 
    (
        get('guest').then(json => {
            if (json.apikey) {
                dispatch(setToken(json.apikey.key, json.user.guest))
                dispatch(setUser(json.user))
            }
        })
    )

export const login = data => dispatch => 
    (
        post('login', true, data).then(json => {
            if (json.apikey) {
                dispatch(setToken(json.apikey.key, json.user.guest))
                dispatch(setUser(json.user))
                return true
            }
        })
    )

export const keepToken = () => dispatch => 
    (
        get('api/keeptoken').then(json => {
            if (json.apikey) {
                dispatch(setToken(json.apikey.key, json.user.guest))
                dispatch(setUser(json.user))
            }
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

export const setUser = data =>
    ({
        type: types.SET_USER,
        data
    })

export const setToken = (value, guest) => {
    Cookies.set('token', value)
    Cookies.set('guest', guest)
    return {
        type: types.SET_TOKEN,
        value,
        guest
    }
}