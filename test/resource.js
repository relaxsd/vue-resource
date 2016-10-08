import Vue from 'vue';

describe('this.$resource', function () {

    it('get({params:{file: "valid.json"}})', (done) => {

        var vm = new Vue({

            created() {

                var resource = this.$resource('data{/file}');

                resource.get({params:{file: 'valid.json'}}).then((res) => {

                    expect(res.ok).toBe(true);
                    expect(res.status).toBe(200);
                    expect(res.data.foo).toBe('bar');

                    done();
                });

            }

        });

    });

    it('get({params:{file: "valid.json"}}) with before() option', (done) => {

        var vm = new Vue({

            created() {

                var resource = this.$resource('data{/file}');

                resource.get({

                    params:{file: 'valid.json'},

                    before: (req) => {
                        expect(typeof req).toBe('object');
                        done();
                    }

                });

            }

        });

    });

    it('save({foo: "bar"}, {params:{file: "valid.json"}})', (done) => {

        var vm = new Vue({

            created() {

                var resource = this.$resource('data{/file}');

                resource.save({foo: 'bar'}, {params:{file: 'valid.json'}}).then((res) => {

                    expect(res.ok).toBe(true);
                    expect(res.status).toBe(200);
                    expect(res.data.foo).toBe('bar');

                    done();
                });

            }

        });

    });

	it('get() with too many arguments', (done) => {

		var vm = new Vue({

			created() {

				var resource = this.$resource('data{/file}');

				try {
					resource.get({}, {}, {});

				} catch (e) {
					expect(e).toBe('Expected up to 2 arguments [body, options], got 3 arguments');
					done();

				}

			}

		});

	});

});
