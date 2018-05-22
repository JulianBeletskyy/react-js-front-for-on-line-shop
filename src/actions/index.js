import api from 'api'
import * as types from './types.js'
import { getServicesCategory } from './services.js'

export const getCategories = param => dispatch => {
    return api.getCategories(param)
    .then(json => {
        if (json.object) {
            if (param) {
                dispatch(setCategory(json.object, param))
                for (let cat of json.object) {
                    let param = {
                        page_size: 2,
                        category: cat.id
                    }
                    dispatch(getServicesCategory(cat.id, param))
                }
            } else {
                dispatch(setCategories(json.object))
            }
        }
    })
}

export const setCategories = data => 
    ({
        type: types.SET_CATEGORIES,
        data
    })

export const setCategory = (data, key) => 
    ({
        type: types.SET_CATEGORY,
        data,
        key
    })

export const setActiveCategory = cat => 
    ({
        type: types.SET_ACTIVE_CATEGORY,
        cat
    })

export const toggleModal = (open, content) => 
    ({
        type: types.TOGGLE_MODAL,
        open,
        content
    })