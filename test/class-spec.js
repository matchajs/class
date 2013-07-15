define(function(require) {
    var expect = require('expect');
    var Class = require('class');

    describe('Class', function() {
        it('Class.create', function() {
            var Person = Class.create({
                Statics: {
                    address: 'Guangzhou, China'
                },
                initialize: function(name, age) {
                    this.name = name;
                    this.age = age;
                },

                talk: function() {
                    return 'My name is ' + this.name + ', ' + this.age + ' year old.';
                }
            });

            var MyPerson = new Person('San', 26);
            expect(MyPerson.talk()).to.equal('My name is San, 26 year old.');
        });

        it('Statics', function() {
            var Person = Class.create({
                Statics: {
                    address: 'Guangzhou, China'
                }
            });

            expect(Person.address).to.equal('Guangzhou, China');
        });

        it('Implements', function() {
            var Gender = {
                female: function() {
                    return 'She is a lovely girl.';
                },
                male: function() {
                    return 'He is a handsome boy.';
                }
            };
            var PersonGender = Class.create({
                Implements: Gender,

                initialize: function(name, gender) {
                    this.name = name;
                    this.gender = gender;
                },

                talk: function() {
                    if (this.gender == 'male') {
                        return 'His name is ' + this.name + ', ' + this.male();
                    } else {
                        return 'Her name is ' + this.name + ', ' + this.female();
                    }
                }
            });

            var MyPerson = new PersonGender('San', 'female');
            expect(MyPerson.talk()).to.equal('Her name is San, She is a lovely girl.');

            var MyPerson2 = new PersonGender('Kidney', 'male');
            expect(MyPerson2.talk()).to.equal('His name is Kidney, He is a handsome boy.');
        });

        it('SubClass extend from Class.Create', function() {
            var Family = require('./family');

            var Branch = Class.create(Family, {
                setAddress: function(name, address) {
                    this.update(name, address);
                }
            });

            var MyBranch = new Branch('Leung');
            MyBranch.add('Kidney', 'male');
            MyBranch.setAddress('Kidney', 'Guangzhou, China');

            var myInfo = MyBranch.get('Kidney');
            expect(myInfo.name).to.equal('Kidney Leung');
            expect(myInfo.gender).to.equal('male');
            expect(myInfo.address).to.equal('Guangzhou, China');
        });

        it('SubClass extend from Class.extend', function() {
            var Family = require('./family');

            var Branch = Family.extend({
                setAddress: function(name, address) {
                    this.update(name, address);
                }
            });

            var MyBranch = new Branch('Leung');
            MyBranch.add('Kidney', 'male');
            MyBranch.setAddress('Kidney', 'Guangzhou, China');

            var myInfo = MyBranch.get('Kidney');
            expect(myInfo.name).to.equal('Kidney Leung');
            expect(myInfo.gender).to.equal('male');
            expect(myInfo.address).to.equal('Guangzhou, China');
        });

        it('SubClass.implement', function() {
            var Family = require('./family');

            var Branch = Family.extend({
                setAddress: function(name, address) {
                    this.update(name, address);
                }
            });

            Branch.implement({
                setTel: function(name, tel) {
                    this.update(name, null, tel);
                }
            });

            var MyBranch = new Branch('Leung');
            MyBranch.add('Kidney', 'male');
            MyBranch.setTel('Kidney', '+86 123456789');

            var myInfo = MyBranch.get('Kidney');
            expect(myInfo.tel).to.equal('+86 123456789');
        });
    });
});