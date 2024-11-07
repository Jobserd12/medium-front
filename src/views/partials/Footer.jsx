import React from "react";

function Footer() {
    return (
        <footer className="py-12 py-lg-24 position-relative overflow-hidden">
            <div className="text-center pt-4">
                <img className="m-auto" src="https://i.postimg.cc/XNQZdmJR/60736.png" alt="logo" width="30px" />
            </div>
            <hr className="my-4" />
            <div className="container position-relative">
                <div className="w-100 d-flex flex-wrap gap-3 mb-4 mt-2 align-items-center justify-content-center"> 
                    <a className="btn btn-link p-0" href="#">Preguntas</a>
                    <a className="btn btn-link p-0" href="#">Cuenta</a>
                    <a className="btn btn-link p-0" href="#">Ayuda</a>
                    <a className="btn btn-link p-0" href="#">Privacidad</a>
                </div>
                <p className="text-center text-secondary mb-2">© 2024 Blog</p> 
            </div>
        </footer>
    );
}

export default Footer;
