define(function(require) {
    var expect = require('expect');
    var Class = require('class');

    describe('Class', function() {
        it('Class.create', function() {
            var Pig = Class.create({
                Statics: {
                    title: 'A1'
                },
                initialize: function(name) {
                    this.name = name;
                },

                talk: function() {
                    return ('I am ' + this.name);
                },

                pigType: 'normalPig'
            });
            var MyPig = new Pig('Super Pig');
            expect(MyPig.pigType).to.equal('normalPig');
            expect(MyPig.talk).to.equal('I am Super Pig');
        });

        it('Extends', function() {

        });

        it('Implements', function() {

        });

        it('Class.extend', function() {

        });

        it('SubClass.extend', function() {

        });

        it('SubClass.implement', function() {

        });
    });
});