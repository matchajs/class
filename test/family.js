define(function(require, exports, module) {
    var Class = require('class');

    var Family = Class.create({
        initialize: function(familyName) {
            this.familyName = familyName;
            this.member = [];
            this.memberIndex = {};
        },

        add: function(name, gender) {
            var index = this.member.push({
                name: name + ' ' + this.familyName,
                gender: gender
            });

            this.memberIndex[name] = --index;
        },

        update: function(name, address, tel) {
            var info = this.get(name);

            address && (info.address = address);
            tel && (info.tel = tel);
        },

        get: function(name) {
            var index = this.memberIndex[name];

            return this.member[index] || 'null';
        },

        count: function() {
            return this.member.length;
        }
    });

    module.exports = Family;
});