module.exports = {
  createValidator: (data) => {
    const errors = [];
    
    // Validações para criação
    if (!data.title || data.title.trim() === '') {
      errors.push('O campo "title" é obrigatório');
    } else if (data.title.length < 3) {
      errors.push('O título deve ter pelo menos 3 caracteres');
    } else if (data.title.length > 100) {
      errors.push('O título deve ter no máximo 100 caracteres');
    }

    if (!data.userId || isNaN(parseInt(data.userId))) {
      errors.push('O campo "userId" deve ser um número válido');
    } else if (parseInt(data.userId) <= 0) {
      errors.push('O campo "userId" deve ser um número positivo');
    }

    return {
      isValid: errors.length === 0,
      errors: errors.length > 0 ? errors : null
    };
  },

  updateValidator: (data) => {
    const errors = [];
    
    // Validações para atualização completa
    if (!data.title || data.title.trim() === '') {
      errors.push('O campo "title" é obrigatório');
    }

    if (!data.userId || isNaN(parseInt(data.userId))) {
      errors.push('O campo "userId" deve ser um número válido');
    }

    if (typeof data.completed !== 'boolean') {
      errors.push('O campo "completed" deve ser um booleano');
    }

    return {
      isValid: errors.length === 0,
      errors: errors.length > 0 ? errors : null
    };
  },

  patchValidator: (data) => {
    const errors = [];
    
    // Validações para atualização parcial
    if (data.title !== undefined) {
      if (data.title.trim() === '') {
        errors.push('O campo "title" não pode estar vazio');
      } else if (data.title.length < 3) {
        errors.push('O título deve ter pelo menos 3 caracteres');
      } else if (data.title.length > 100) {
        errors.push('O título deve ter no máximo 100 caracteres');
      }
    }

    if (data.userId !== undefined && isNaN(parseInt(data.userId))) {
      errors.push('O campo "userId" deve ser um número válido');
    }

    if (data.completed !== undefined && typeof data.completed !== 'boolean') {
      errors.push('O campo "completed" deve ser um booleano');
    }

    return {
      isValid: errors.length === 0,
      errors: errors.length > 0 ? errors : null
    };
  }
};