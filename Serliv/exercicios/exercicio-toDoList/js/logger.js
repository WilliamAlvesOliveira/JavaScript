;(function(window){
    const IS_DEV = true

    function formatMessage(level, message){
        const timestamp = new Date().toISOString()
        return `[${level.toUpperCase()}] [${timestamp}]: ${message}`
    }

    function logINFO(message, data = null){
        if (IS_DEV){
            console.info(formatMessage('info', message))
            if (data) console.info('📥: ', data)
        }
    }

    function logWarn(message, data = null){
        if (IS_DEV){
            console.warn(formatMessage('warn', message))
            if (data) console.warn('⚠️: ', data)
        }
    }

    function logError(message, error = null){
        console.error(formatMessage('error', message))
        if (error) console.error('❌: ', error)
    }

    function logDebug(message, data = null){
        if (IS_DEV){
            console.debug(formatMessage('debug', message))
            if (data) console.debug('🐞 ', data)
        }
    }

    window.logger = {
        logINFO,
        logWarn,
        logError,
        logDebug
    }

})(window)

