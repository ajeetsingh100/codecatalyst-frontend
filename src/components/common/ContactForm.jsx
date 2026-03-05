import React from 'react'
import {phoneNumber} from '../../data/countrycode'
const ContactForm = () => {
  return (
    <div>
        <div className='container d-flex justify-content-center mt-3 mb-3'>
            <div className='container w-50 shadow-sm border px-3 py-3 '>
                <div>
                    <div className='mb-3 text-center '>
                        <h2 className='fw-bold'>Get in Touch</h2>
                        <div>We'd love to her for you, Please fill out this form.</div>
                    </div>
                    <div>
                        <form action="">
                            <div className='row row-gap-3'>
                                    <div className=' form-group col-6'>
                                        <label htmlFor="" className='form-label'>First Name</label>
                                        <input type="text" className='form-control' name="" id="" placeholder='First Name'/>
                                    </div>
                                    <div className=' form-group col-6'>
                                        <label htmlFor="" className='form-label'>Last Name</label>
                                        <input type="text" className='form-control' name="" id=""placeholder='Last Name' />
                                    </div>
                                    <div className='form group col-12'>
                                        <label htmlFor="" className='form-label'>Email</label>
                                        <input type="email" name="" id="" className='form-control' placeholder='Email' />
                                    </div>
                                    <div className='form-group col-4'>
                                        <label htmlFor="" className='form-label'>Phone number</label>                                    
                                            <select name="" id="" className='form-control'>
                                                {
                                                    phoneNumber.map((number)=>
                                                        <option value={number.code}>{number.code} {number.country}</option>
                                                    )
                                                }
                                            </select>    
                                    </div>                                
                                    <div className=' form-group col-8'>
                                        <label htmlFor="" className='form-label opacity-0'>Hiddne</label>
                                        <input type="tel" name="" className='form-control' id="" placeholder='Phone number'/>
                                    </div>                    
                                    <div className='form-group col-12 '>
                                        <label htmlFor="" className='form-label'>Address</label>
                                        <textarea name="" id=""className='form-control'placeholder='Enter your address...' cols={'30'} rows={'7'}></textarea>
                                    </div>
                                    <div className='form-group col-12'>
                                        <button className='btn btn-warning form-control'>Send Message</button>
                                    </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ContactForm