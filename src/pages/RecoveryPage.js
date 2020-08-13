import React from "react"
import passwordReset from '../assets/images/password-reset.svg'
import { NavLink} from "react-router-dom"
import logoSm2 from '../assets/images/logo_sm_2.png'

export const RecoveryPage = () => {
  return (
    <section className="bg-login">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-sm-12">
            <div className="wrapper-page">
              <div className="account-pages">
                <div className="account-box">
                  <div className="card m-b-30">
                    <div className="card-body">
                      <div className="card-title text-center">
                        <img src={logoSm2} alt="" className="" />
                        <h5 className="mt-3"><b>Resetează parola</b></h5>
                      </div>
                      <form role="form" className="text-center contact-form">
                        <div className="alert alert-info alert-dismissable mt-4">
                          <button type="button" className="close text-white" data-dismiss="alert" aria-hidden="true">×
                          </button>
                          Introdu adresa de <b>email</b> și urmează pașii următori!
                        </div>
                        <div className="form-group mt-5">
                          <div className="input-group">
                            <input type="email" className="form-control" placeholder="Adresa de email" required="required" />
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="col-sm-12 mt-3 px-0">
                            <button className="btn btn-primary btn-block" type="submit">Resetează</button>
                          </div>
                        </div>
                        <NavLink to={'/login'}>Înapoi la formularul de conectare</NavLink>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}