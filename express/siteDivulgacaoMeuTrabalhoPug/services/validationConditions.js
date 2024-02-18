const validationConditions = {

    createSection: { title: ['isNullOrEmpty', 'min_3'], description: ['isNullOrEmpty', 'min_3'], icon: ['isNullOrEmpty', 'min_10'], position: ['isNullOrEmpty', 'min_1'], sectionType: ['isNullOrEmpty', 'min_4'], routeParameter: ['isNullOrEmpty', 'min_1'] },

    createPage: { title: ['isNullOrEmpty', 'min_3'], sectionId: ['isNullOrEmpty', 'min_5'], content: ['isNullOrEmpty', 'min_10'] },

    createUser: { name: ['isNullOrEmpty', 'min_3'], password: ['isNullOrEmpty', 'min_6'], email: ['validateEmail'] },

    login: { password: ['isNullOrEmpty', 'min_6'], email: ['validateEmail'] }

}

module.exports = {
    validationConditions
}