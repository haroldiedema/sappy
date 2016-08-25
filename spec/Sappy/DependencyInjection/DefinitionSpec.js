describe('Sappy.DependencyInjection.Definition', function () {

    var Container  = require('../../../src/Sappy/DependencyInjection/Container'),
        Definition = require('../../../src/Sappy/DependencyInjection/Definition');

    var container = new Container();

    it('Should be able to resolve a native function', function () {
        var res,
            def = new Definition({ function: function (a) { return { a: (res = a) }; }, arguments: [42] }),
            srv = def._initialize(container);

        expect(typeof srv).toEqual('object');
        expect(srv.a).toEqual(42);
        expect(res).toEqual(42);
    });

    it('Should be able to resolve a function from a factory', function () {
        var my_factory = {
            createIt: function (a, b, c) {
                return new (function (a, b, c) {
                    return {a: a + 10, b: b + 10, c: c + 10, org: [a, b, c]}
                })(a, b, c);
            }
        };

        var def = new Definition({ factory: my_factory, factory_method: 'createIt', arguments: [1, 2, 3]}),
            srv = def._initialize(container);

        expect(srv).toEqual({ a: 11, b: 12, c: 13, org: [ 1, 2, 3 ] });
    });

    it('Should be able to handle method calls', function () {

        container.setParameter('number', 42);
        var _called = false,
            def     = new Definition({
                function: function (num) { return { a: function (a) { _called = a + num }} },
                arguments: ["%number%"],
                method_calls: [
                    ['a', [10]]
                ]
            }),
            srv = def._initialize(container);

        console.log(srv);
        console.log(_called);
    });
});
