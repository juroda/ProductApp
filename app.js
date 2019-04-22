//CLASE INTERACTUA CON PRODUCTO
class Product{
  constructor(name, price, year){
    this.name = name;
    this.price = price;
    this.year = year;
  }
} 

//CLASE QUE INTERACTUA CON HTML
class UI{
  addProduct(product){
    const productList = document.getElementById('product-list');
    const element = document.createElement('div');
    element.innerHTML = `
      <div class="card text-center mb-4">
        <div class="card-body">
          <strong>Product name</strong>: ${product.name}
          <strong>Product price</strong>: ${product.price}
          <strong>Product year</strong>: ${product.year}
          <a href="#" class="btn btn-danger" name="delete">Delete</a>
        </div>
      </div>
    `;

    productList.appendChild(element);
    this.resetForm();
  }

  resetForm(){
    document.getElementById('product-form').reset();
  }

  deleteProduct(element){
    if(element.name === 'delete'){
      console.log(element.parentElement.parentElement.parentElement.remove());

      this.showMessage('Product deleted Succesfuly', 'danger');
    }
  }

  showMessage(message, cssClass){
    const div = document.createElement('div');
    div.className = `alert alert-${cssClass} mt-2`;
    div.appendChild(document.createTextNode(message));
    
    //Mostrando en el DOM
    const container = document.querySelector('.container');
    const app = document.querySelector('#App');

    container.insertBefore(div, app);

    setTimeout(function(){
      document.querySelector('.alert').remove();
    }, 2000);
  }
}

//DOM EVENTS _ HTML INTERACCIONES
document.getElementById('product-form')
  .addEventListener('submit', function (e) {
    const name= document.getElementById('name').value;
    const price= document.getElementById('price').value;
    const year= document.getElementById('year').value;

    const product = new Product(name, price, year);

    const ui = new UI();

    if(name === '' || price ==='' || year === ''){
      return ui.showMessage('Complete fields. Please', 'warning');

    }

    ui.addProduct(product);
    ui.resetForm();
    ui.showMessage('Producto Agregado', 'success');
    
    e.preventDefault();
});

document.getElementById('product-list').addEventListener('click', function(e){
    console.log(e.target);
    const ui = new UI();
    ui.deleteProduct(e.target);

});