# Resource

The resource service can be used globally `Vue.resource` or in a Vue instance `this.$resource`.

## Methods

* `resource(url, [params], [actions], [options])`

## Default Actions

```js
get: {method: 'GET'},         // get([options])
save: {method: 'POST'},       // save([body], [options])
query: {method: 'GET'},       // query([options])
update: {method: 'PUT'},      // update([body], [options])
patch: {method: 'PATCH'},     // patch([body], [options])
remove: {method: 'DELETE'},   // remove([options])
delete: {method: 'DELETE'}    // delete([options])
```

## Example

```js
{
  var resource = this.$resource('someItem{/id}');

  // GET someItem/1
  resource.get({params:{id: 1}}).then((response) => {
    this.$set('item', response.json())
  });

  // POST someItem/1
  resource.save({item: this.item}, {params:{id: 1}}).then((response) => {
    // success callback
  }, (response) => {
    // error callback
  });

  // DELETE someItem/1
  resource.delete({params:{id: 1}}).then((response) => {
    // success callback
  }, (response) => {
    // error callback
  });
}
```

## Custom Actions

```js
{
  var customActions = {
    foo: {method: 'GET', url: 'someItem/foo{/id}'},
    bar: {method: 'POST', url: 'someItem/bar{/id}'}
  }

  var resource = this.$resource('someItem{/id}', {}, customActions);

  // GET someItem/foo/1
  resource.foo({params:{id: 1}}).then((response) => {
    this.$set('item', response.json())
  });

  // POST someItem/bar/1
  resource.bar({item: this.item}, {params:{id: 1}}).then((response) => {
    // success callback
  }, (response) => {
    // error callback
  });
}
```
