
import React, { Component, useEffect, useState } from 'react';
import { FormControl } from "react-bootstrap"
import axios from 'axios';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { Vortex } from 'react-loader-spinner';
import Select from 'react-select'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import finvestfx from '../assets/finvestfxLogo.png'

const Finvestfx = () => {
  const [finvestfxData, setFinvestfxData] = useState([])
  const [finvestfxDataBackup, setFinvestfxDataBackup] = useState([])
  const [currentPrice, setCurrentPrice] = useState(0)
  const [originalPrice, setOriginalPrice] = useState(0)
  const [ascendingDescending, setAscendingDescending] = useState(0)

  const [serialNumberList, setSerialNumberList] = useState([])
  const [nameList, setNameList] = useState([])
  const [imageUrlList, setImageUrlList] = useState([])
  const [categoryList, setCategoryList] = useState([])
  const [labelList, setLabelList] = useState([])
  const [priceList, setPriceList] = useState([])
  const [descriptionList, setDescriptionList] = useState([])

  const [serialNumberValue, setSerialNumberValue] = useState({ label: "", value: "" })
  const [nameValue, setNameValue] = useState({ label: "", value: "" })
  const [imageUrlValue, setImageUrlValue] = useState({ label: "", value: "" })
  const [categoryValue, setCategoryValue] = useState({ label: "", value: "" })
  const [labelValue, setLabelValue] = useState({ label: "", value: "" })
  const [priceValue, setPriceValue] = useState({ label: "", value: "" })
  const [descriptionValue, setDesciptionValue] = useState({ label: "", value: "" })

  const [idFormValue, setIdFormValue] = useState('')
  const [nameFormValue, setNameFormValue] = useState('')
  const [imageUrlFormValue, setImageUrlFormValue] = useState('')
  const [categoryFormValue, setCategoryFormValue] = useState('')
  const [labelFormValue, setLabelFormValue] = useState('')
  const [priceFormValue, setPriceFormValue] = useState('')
  const [descriptionFormValue, setDesciptionFormValue] = useState('')

  const applyFiltersFunction = () => {
    var filterData = finvestfxDataBackup.filter((item, key) => {
      var serialNumberValueBool = false
      var nameValueBool = false
      var imageUrlValueBool = false
      var categoryValueBool = false
      var labelValueBool = false
      var priceValueBool = false
      var descriptionValueBool = false

      if ((serialNumberValue.value !== "" && parseInt(serialNumberValue.value) === (key + 1)) || serialNumberValue.value === "") {
        serialNumberValueBool = true
      }
      if ((nameValue.value !== "" && nameValue.value === item.name) || nameValue.value === "") {
        nameValueBool = true
      }
      if ((imageUrlValue.value !== "" && imageUrlValue.value === item.imageUrl) || imageUrlValue.value === "") {
        imageUrlValueBool = true
      }
      if ((categoryValue.value !== "" && categoryValue.value === item.category) || categoryValue.value === "") {
        categoryValueBool = true
      }
      if ((labelValue.value !== "" && labelValue.value === item.label) || labelValue.value === "") {
        labelValueBool = true
      }
      if ((priceValue.value !== "" && priceValue.value === item.price) || priceValue.value === "") {
        priceValueBool = true
      }
      if ((descriptionValue.value !== "" && descriptionValue.value === item.description) || descriptionValue.value === "") {
        descriptionValueBool = true
      }

      return serialNumberValueBool && nameValueBool && imageUrlValueBool && categoryValueBool && labelValueBool && priceValueBool && descriptionValueBool
    })

    setFinvestfxData(filterData)
  }

  const resetPriceFunction = () => {
    console.log('resetPriceFunction')
    axios({
      method: 'post',
      url: 'http://localhost:3002/finvestfxApi/editData',
      data: {
        id: idFormValue,
        price: priceFormValue
      }
    }).then((res) => {
      console.log(res)
      initializer()
    })
  }

  const setEditValuesFunction = (item) => {
    setIdFormValue(item.id)
    setNameFormValue(item.name)
    setImageUrlFormValue(item.imageUrl)
    setCategoryFormValue(item.category)
    setLabelFormValue(item.label)
    setPriceFormValue(item.price)
    setDesciptionFormValue(item.description)
  }

  const setEditValuesNewFunction = () => {
    setIdFormValue('')
    setNameFormValue('')
    setImageUrlFormValue('')
    setCategoryFormValue('')
    setLabelFormValue('')
    setPriceFormValue('')
    setDesciptionFormValue('')
  }

  const sortPriceListDescHelper = (item1, item2) => {
    if (parseFloat(item1.price) < parseFloat(item2.price)) {
      return 1
    }
    if (parseFloat(item1.price) > parseFloat(item2.price)) {
      return -1
    }
    return 0
  }

  const sortPriceListAscHelper = (item1, item2) => {
    if (parseFloat(item1.price) > parseFloat(item2.price)) {
      return 1
    }
    if (parseFloat(item1.price) < parseFloat(item2.price)) {
      return -1
    }
    return 0
  }

  const sortPriceList = (order) => {
    if (order === 1) {
      var temp = finvestfxDataBackup
      var sortedArray = temp.sort(sortPriceListDescHelper)
    } else {
      var temp = finvestfxDataBackup
      var sortedArray = temp.sort(sortPriceListAscHelper)
    }
    setFinvestfxData(sortedArray)
    setFinvestfxDataBackup(sortedArray)
  }

  const editPriceFunction = () => {
    console.log('editPriceFunction')
    axios({
      method: 'post',
      url: 'http://localhost:3002/finvestfxApi/editData',
      data: {
        id: idFormValue,
        price: priceFormValue
      }
    }).then((res) => {
      console.log(res)
      initializer()
    })
  }

  const addItemFunction = () => {
    axios({
      method: 'post',
      url: 'http://localhost:3002/finvestfxApi/setData',
      data: {
        price: priceFormValue,
        name: nameFormValue,
        imageUrl: imageUrlFormValue,
        category: categoryFormValue,
        label: labelFormValue,
        price: priceFormValue,
        description: descriptionFormValue,
      }
    }).then((res) => {
      console.log(res)
      initializer()
    })
  }

  const resetDataFunction = () => {
    setSerialNumberValue({ label: "", value: "" })
    setNameValue({ label: "", value: "" })
    setImageUrlValue({ label: "", value: "" })
    setCategoryValue({ label: "", value: "" })
    setLabelValue({ label: "", value: "" })
    setPriceValue({ label: "", value: "" })
    setDesciptionValue({ label: "", value: "" })

    setFinvestfxData(finvestfxDataBackup)
  }

  const listOptions = (FinvestfxData) => {
    var SerialNumberList = []
    var NameList = []
    var ImageUrlList = []
    var CategoryList = []
    var LabelList = []
    var PriceList = []
    var DescriptionList = []

    var NameListTemp = []
    var ImageUrlListTemp = []
    var CategoryListTemp = []
    var LabelListTemp = []
    var PriceListTemp = []
    var DescriptionListTemp = []

    SerialNumberList.push({
      'value': "",
      'label': ""
    })
    NameList.push({
      'value': "",
      'label': ""
    })
    ImageUrlList.push({
      'value': "",
      'label': ""
    })
    CategoryList.push({
      'value': "",
      'label': ""
    })
    LabelList.push({
      'value': "",
      'label': ""
    })
    PriceList.push({
      'value': "",
      'label': ""
    })
    DescriptionList.push({
      'value': "",
      'label': ""
    })

    for (const key in FinvestfxData) {
      SerialNumberList.push({
        'value': parseInt(key) + 1,
        'label': parseInt(key) + 1
      })
      if (FinvestfxData[key].name !== "" && NameListTemp.indexOf(FinvestfxData[key].name) === -1) {
        NameListTemp.push(FinvestfxData[key].name)
        NameList.push({
          'value': FinvestfxData[key].name,
          'label': FinvestfxData[key].name
        })
      }
      if (FinvestfxData[key].imageUrl !== "" && ImageUrlListTemp.indexOf(FinvestfxData[key].imageUrl) === -1) {
        ImageUrlListTemp.push(FinvestfxData[key].imageUrl)
        ImageUrlList.push({
          'value': FinvestfxData[key].imageUrl,
          'label': FinvestfxData[key].imageUrl
        })
      }
      if (FinvestfxData[key].category !== "" && CategoryListTemp.indexOf(FinvestfxData[key].category) === -1) {
        CategoryListTemp.push(FinvestfxData[key].category)
        CategoryList.push({
          'value': FinvestfxData[key].category,
          'label': FinvestfxData[key].category
        })
      }
      if (FinvestfxData[key].label !== "" && CategoryListTemp.indexOf(FinvestfxData[key].label) === -1) {
        LabelListTemp.push(FinvestfxData[key].label)
        LabelList.push({
          'value': FinvestfxData[key].label,
          'label': FinvestfxData[key].label
        })
      }
      if (FinvestfxData[key].price !== "" && PriceListTemp.indexOf(FinvestfxData[key].price) === -1) {
        PriceListTemp.push(FinvestfxData[key].price)
        PriceList.push({
          'value': FinvestfxData[key].price,
          'label': FinvestfxData[key].price
        })
      }
      if (FinvestfxData[key].description !== "" && DescriptionListTemp.indexOf(FinvestfxData[key].description) === -1) {
        DescriptionListTemp.push(FinvestfxData[key].description)
        DescriptionList.push({
          'value': FinvestfxData[key].description,
          'label': FinvestfxData[key].description
        })
      }
    }

    setSerialNumberList(SerialNumberList)
    setNameList(NameList)
    setImageUrlList(ImageUrlList)
    setCategoryList(CategoryList)
    setLabelList(LabelList)
    setPriceList(PriceList)
    setDescriptionList(DescriptionList)
  }


  const exportPdf = () => {
    const doc = new jsPDF()

    autoTable(doc, { html: '#table-to-xls' })

    doc.save('finvestfx Report.pdf')
  }

  const initializer = async () => {
    const finvestfxData = await axios.get('http://localhost:3002/finvestfxApi/')

    listOptions(finvestfxData.data)

    setFinvestfxData(finvestfxData.data)
    setFinvestfxDataBackup(finvestfxData.data)
  }

  useEffect(() => {
    console.log('useeffect finvestfx report is called')
    initializer()
  }, [])

  return (
    <>
      <div className="">
        <div className="bg-white pt-2">
          <div className="d-flex  col-md-10">
            <div className="nav nav-tabs">
              <div style={{ color: '#EC9923', fontWeight: '1000', fontSize: '20px' }}>
                <img src={finvestfx} style={{height:'25px'}}/> Finvestfx Report
              </div>
            </div>
            <div className="tooltipIngnationOn" style={{ position: 'absolute', right: '160px', marginTop: '-5px', backgroundColor: '#468E82', borderRadius: '0.2rem' }} data-toggle="modal" data-target="#addItem">
              <button type="submit" name="CurrentMonthExcel" className="btn btn-sm" onClick={setEditValuesNewFunction} value="CurrentMonthExcel">
                <div style={{ fontSize: '15px', height: '100%', color: '#FFF' }}>
                  <i class="fa-solid fa-plus"></i>
                  <span className="currentMonthReportText" style={{ top: '35px', right: '-58px' }}>Add Item</span>
                </div>
              </button>
            </div>
            <div className="tooltipIngnationOn" style={{ position: 'absolute', right: '123px', marginTop: '-5px', backgroundColor: '#D95E1A', borderRadius: '0.2rem' }}>
              <button type="submit" name="CurrentMonthExcel" className="btn btn-sm" onClick={applyFiltersFunction} value="CurrentMonthExcel">
                <div style={{ fontSize: '15px', height: '100%', color: '#FFF' }}>
                  <i class="fa-solid fa-filter"></i>
                  <span className="currentMonthReportText" style={{ top: '35px', right: '-58px' }}>Apply Filters</span>
                </div>
              </button>
            </div>
            <div className="tooltipIngnationOn" style={{ position: 'absolute', right: '85px', marginTop: '-5px', backgroundColor: 'rgb(0 0 0 / 80%)', borderRadius: '0.2rem' }}>
              <button type="submit" name="CurrentMonthExcel" className="btn btn-sm" onClick={resetDataFunction} value="CurrentMonthExcel">
                <div style={{ fontSize: '15px', height: '100%', color: '#FFF' }}>
                  <i class="fa-solid fa-arrows-rotate"></i>
                  <span className="currentMonthReportText" style={{ top: '35px', right: '-50px' }}>Reset Data</span>
                </div>
              </button>
            </div>
            <div className="tooltipIngnationOn" style={{ position: 'absolute', right: '47px', marginTop: '-5px', backgroundColor: '#EC9923', borderRadius: '0.2rem' }}>
              <button type="submit" name="CurrentMonthExcel" className="btn btn-sm" onClick={exportPdf} value="CurrentMonthExcel">
                <div style={{ fontSize: '15px', height: '100%', color: '#FFF' }}>
                  <i class="fa-solid fa-file-pdf"></i>
                  <span className="currentMonthReportText" style={{ top: '35px', right: '-40px' }}>Download PDF Report</span>
                </div>
              </button>
            </div>
            <div className="tooltipIngnationOn" style={{ position: 'absolute', right: '11px', marginTop: '-5px', backgroundColor: '#A31106', borderRadius: '0.2rem' }}>
              <button type="submit" name="CurrentMonthExcel" className="btn btn-sm" value="CurrentMonthExcel">
                <ReactHTMLTableToExcel
                  id=""
                  className=""
                  table="table-to-xls"
                  filename="finvestfx Report"
                  sheet="finvestfx Data"
                  buttonText={<div style={{ background: '#A31106', fontSize: '15px', height: '100%', color: '#FFF' }}><i class="fa-solid fa-file-csv"></i></div>} />
                <span className="currentMonthReportText" style={{ top: '35px', right: '0px' }}>Download Excel Report</span>
              </button>
            </div>
          </div>
        </div>
        <div className="table-responsive">
          <table id="table-to-xls" className="triptable">
            <thead className="tback">
              <tr className="fontstyle" style={{ background: "white", borderTop: "1px solid #B8D5AF" }}>
                <th className="" style={{ padding: "2px 0px" }}>
                  <Select options={serialNumberList}
                    className="vehicleNumberSelect"
                    name="" id=""
                    onChange={(e) => setSerialNumberValue({ label: e.label, value: e.value })}
                    defaultValue={{ label: serialNumberValue.label, value: serialNumberValue.value }}
                    value={{ label: serialNumberValue.label, value: serialNumberValue.value }}
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        margin: '0 2px',
                        fontSize: '14px',
                        width: '250px',
                        color: '#ADC4DA',
                        fontFamily: 'Apple-System,Arial,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,STXihei,sans-serif'
                      }),
                      option: (baseStyles, state) => ({
                        ...baseStyles,
                        fontSize: '14px',
                        height: '100%',
                        color: '#000',
                        fontFamily: 'Apple-System,Arial,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,STXihei,sans-serif',
                        backgroundColor: state.isSelected ? '#EEEEEE' : 'white'
                      }),
                    }}
                  />
                </th>
                <th className="" style={{ padding: "2px 0px" }}>
                  <Select options={nameList}
                    className="vehicleNumberSelect"
                    name="" id=""
                    onChange={(e) => setNameValue({ label: e.label, value: e.value })}
                    defaultValue={{ label: nameValue.label, value: nameValue.value }}
                    value={{ label: nameValue.label, value: nameValue.value }}
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        margin: '0 2px',
                        fontSize: '14px',
                        width: '250px',
                        color: '#ADC4DA',
                        fontFamily: 'Apple-System,Arial,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,STXihei,sans-serif'
                      }),
                      option: (baseStyles, state) => ({
                        ...baseStyles,
                        fontSize: '14px',
                        height: '100%',
                        color: '#000',
                        fontFamily: 'Apple-System,Arial,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,STXihei,sans-serif',
                        backgroundColor: state.isSelected ? '#EEEEEE' : 'white'
                      }),
                    }}
                  />
                </th>
                <th className="" style={{ padding: "2px 0px" }}>
                  <Select options={imageUrlList}
                    className="vehicleNumberSelect"
                    name="" id=""
                    onChange={(e) => setImageUrlValue({ label: e.label, value: e.value })}
                    defaultValue={{ label: imageUrlValue.label, value: imageUrlValue.value }}
                    value={{ label: imageUrlValue.label, value: imageUrlValue.value }}
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        margin: '0 2px',
                        fontSize: '14px',
                        width: '250px',
                        color: '#ADC4DA',
                        fontFamily: 'Apple-System,Arial,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,STXihei,sans-serif'
                      }),
                      option: (baseStyles, state) => ({
                        ...baseStyles,
                        fontSize: '14px',
                        height: '100%',
                        color: '#000',
                        fontFamily: 'Apple-System,Arial,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,STXihei,sans-serif',
                        backgroundColor: state.isSelected ? '#EEEEEE' : 'white'
                      }),
                    }}
                  />
                </th>
                <th className="" style={{ padding: "2px 0px" }}>
                  <Select options={categoryList}
                    className="vehicleNumberSelect"
                    name="" id=""
                    onChange={(e) => setCategoryValue({ label: e.label, value: e.value })}
                    defaultValue={{ label: categoryValue.label, value: categoryValue.value }}
                    value={{ label: categoryValue.label, value: categoryValue.value }}
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        margin: '0 2px',
                        fontSize: '14px',
                        width: '250px',
                        color: '#ADC4DA',
                        fontFamily: 'Apple-System,Arial,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,STXihei,sans-serif'
                      }),
                      option: (baseStyles, state) => ({
                        ...baseStyles,
                        fontSize: '14px',
                        height: '100%',
                        color: '#000',
                        fontFamily: 'Apple-System,Arial,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,STXihei,sans-serif',
                        backgroundColor: state.isSelected ? '#EEEEEE' : 'white'
                      }),
                    }}
                  />
                </th>
                <th className="" style={{ padding: "2px 0px" }}>
                  <Select options={labelList}
                    className="vehicleNumberSelect"
                    name="" id=""
                    onChange={(e) => setLabelValue({ label: e.label, value: e.value })}
                    defaultValue={{ label: labelValue.label, value: labelValue.value }}
                    value={{ label: labelValue.label, value: labelValue.value }}
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        margin: '0 2px',
                        fontSize: '14px',
                        width: '250px',
                        color: '#ADC4DA',
                        fontFamily: 'Apple-System,Arial,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,STXihei,sans-serif'
                      }),
                      option: (baseStyles, state) => ({
                        ...baseStyles,
                        fontSize: '14px',
                        height: '100%',
                        color: '#000',
                        fontFamily: 'Apple-System,Arial,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,STXihei,sans-serif',
                        backgroundColor: state.isSelected ? '#EEEEEE' : 'white'
                      }),
                    }}
                  />
                </th>
                <th className="" style={{ padding: "2px 0px" }}>
                  <Select options={priceList}
                    className="vehicleNumberSelect"
                    name="" id=""
                    onChange={(e) => setPriceValue({ label: e.label, value: e.value })}
                    defaultValue={{ label: priceValue.label, value: priceValue.value }}
                    value={{ label: priceValue.label, value: priceValue.value }}
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        margin: '0 2px',
                        fontSize: '14px',
                        width: '250px',
                        color: '#ADC4DA',
                        fontFamily: 'Apple-System,Arial,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,STXihei,sans-serif'
                      }),
                      option: (baseStyles, state) => ({
                        ...baseStyles,
                        fontSize: '14px',
                        height: '100%',
                        color: '#000',
                        fontFamily: 'Apple-System,Arial,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,STXihei,sans-serif',
                        backgroundColor: state.isSelected ? '#EEEEEE' : 'white'
                      }),
                    }}
                  />
                </th>
                <th className="" style={{ padding: "2px 0px" }}>
                  <Select options={descriptionList}
                    className="vehicleNumberSelect"
                    name="" id=""
                    onChange={(e) => setDesciptionValue({ label: e.label, value: e.value })}
                    defaultValue={{ label: descriptionValue.label, value: descriptionValue.value }}
                    value={{ label: descriptionValue.label, value: descriptionValue.value }}
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        margin: '0 2px',
                        fontSize: '14px',
                        width: '250px',
                        color: '#ADC4DA',
                        fontFamily: 'Apple-System,Arial,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,STXihei,sans-serif'
                      }),
                      option: (baseStyles, state) => ({
                        ...baseStyles,
                        fontSize: '14px',
                        height: '100%',
                        color: '#000',
                        fontFamily: 'Apple-System,Arial,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,STXihei,sans-serif',
                        backgroundColor: state.isSelected ? '#EEEEEE' : 'white'
                      }),
                    }}
                  />
                </th>
              </tr>
              <tr className="fontstyle">
                <th className="px-2">S.No.</th>
                <th className="px-2">Name</th>
                <th className="px-2">Image</th>
                <th className="px-2">Category</th>
                <th className="px-2">Label</th>
                <th className="px-2">
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <span>Price</span>
                    <span style={{ cursor: 'pointer', marginLeft: '5px', color: ascendingDescending === 0 ? '#8c8c8c' : '#000' }}>
                      {ascendingDescending === 1 ?
                        <i class="fa-solid fa-caret-up tooltipIngnationOn" onClick={() => { setAscendingDescending(2); sortPriceList(2); }}></i>
                        :
                        <i class="fa-solid fa-caret-down tooltipIngnationOn" onClick={() => { setAscendingDescending(1); sortPriceList(1); }}></i>
                      }
                    </span>
                  </div></th>
                <th className="px-2">Description</th>
              </tr>
            </thead>
            <tbody>
              {
                finvestfxData?.length >= 1 ?
                  finvestfxData?.map((item, key) => (
                    <tr className="fontstyle" key={key} style={{ borderBottom: "1px solid #DCEAD7" }}>
                      <td>{key + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.imageUrl}</td>
                      <td>{item.category}</td>
                      <td>{item.label}</td>
                      <td>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <span>${item.price}</span>
                          <span style={{ cursor: 'pointer', border: '1px solid #ccc', color: '#000', background: '#ECE7B5', marginLeft: '5px', padding: '3px', borderRadius: '5px' }} data-toggle="modal" data-target="#editPrice" onClick={() => setEditValuesFunction(item)}><i class="fa-solid fa-pencil"></i></span>
                          <span style={{ cursor: 'pointer', border: '1px solid #ccc', color: '#fff', background: '#000', marginLeft: '5px', padding: '3px', borderRadius: '5px' }} data-toggle="modal" data-target="#resetPrice" onClick={() => { setCurrentPrice(item.price); setOriginalPrice(item.firstPrice); setIdFormValue(item.id); setPriceFormValue(item.firstPrice); }}><i class="fa-solid fa-rotate"></i></span>
                        </div>
                      </td>
                      <td>{item.description}</td>
                    </tr>
                  ))
                  :
                  ''
              }
            </tbody>
          </table>
        </div>
        <form className='shareurlsec'>
          <div className="modal fade" id='resetPrice'>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Reset price or not?</h4>
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                </div>
                <div className="modal-body">
                  <div style={{ display: 'flex', fontSize: '13px', color: '#3A3A3A', fontWeight: '600' }}>
                    {`Do you want to reset price value of ${currentPrice} to ${originalPrice}?(This action cannot be undone)`}
                  </div>
                  <div style={{ display: 'flex', float: 'right' }}>
                    <i class="fa-solid fa-check alertCardRightWrong" style={{ cursor: 'pointer', color: '#fff', fontWeight: '600', padding: '5px', marginRight: '2px' }} onClick={() => resetPriceFunction()} data-dismiss="modal"></i>
                    <i class="fa-solid fa-xmark alertCardRightWrong" style={{ cursor: 'pointer', color: '#fff', fontWeight: '600', padding: '5px' }} data-dismiss="modal"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        <div className="modal fade" id="editPrice" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title"><i class="fas fa-user"></i> Edit Item Details</h4>
                <button type="button" className="close" data-dismiss="modal">&times;</button>
              </div>
              <div className="modal-body">
                <div className="row">
                  {/* {
                    apiResponse !== '' && <div style={{ fontWeight: '700', color: 'green', fontSize: '15px' }}>{apiResponse}</div>
                  } */}
                  <div className="col-md-6">
                    <label className="control-label w-100" htmlFor="username">Name:</label>
                    <input id="name" name="name" placeholder="Enter Name" className="form-control " onChange={(e) => setNameFormValue(e.target.value)} value={nameFormValue} type="text" required></input>
                    <label className="control-label w-100" htmlFor="password">Image</label>
                    <input id="name" name="name" placeholder="Enter Image Url" className="form-control " onChange={(e) => setImageUrlFormValue(e.target.value)} value={imageUrlFormValue} type="text" required></input>
                    <label className="control-label w-100" htmlFor="email">Category</label>
                    <input id="email" name="email" placeholder="Enter Category" className="form-control" onChange={(e) => setCategoryFormValue(e.target.value)} value={categoryFormValue} type="text" required></input>
                  </div>
                  <div className="col-md-6">
                    <label className="control-label w-100" htmlFor="email">Label:</label>
                    <input id="Username" name="username" placeholder="Enter Label" className="form-control" onChange={(e) => setLabelFormValue(e.target.value)} value={labelFormValue} type="text" required></input>
                    <label className="control-label w-100" htmlFor="password_confirm">Price:</label>
                    <input id="password_confirm" name="password_confirm" placeholder="Enter Price" className="form-control" onChange={(e) => setPriceFormValue(e.target.value)} value={priceFormValue} type="number" required></input>
                    <label className="control-label" htmlFor="contact">Description:</label>
                    <input id="contact" name="contact" placeholder="Enter Description" className="form-control" onChange={(e) => setDesciptionFormValue(e.target.value)} value={descriptionFormValue} type="text" minLength="10" maxlength="10" required></input>
                  </div>
                  <div className="control-group pull-right text-right mt-2" >
                    <div className="btn btn-success" style={{ lineHeight: '1.4' }} data-dismiss="modal" onClick={editPriceFunction}>Edit</div>
                    <div className="form-control" type="button" data-dismiss="modal" style={{ marginTop: '0', maxWidth: '50px', textAlign: 'center', background: '#8e4646', fontSize: '1rem', color: '#fff', display: 'flex', justifyContent: 'center', height: '36px', marginLeft: '2px', float: 'right' }}>Close</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade" id="addItem" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title"><i class="fas fa-user"></i> Add Item Details</h4>
                <button type="button" className="close" data-dismiss="modal">&times;</button>
              </div>
              <div className="modal-body">
                <div className="row">
                  {/* {
                    apiResponse !== '' && <div style={{ fontWeight: '700', color: 'green', fontSize: '15px' }}>{apiResponse}</div>
                  } */}
                  <div className="col-md-6">
                    <label className="control-label w-100" htmlFor="username">Name:</label>
                    <input id="name" name="name" placeholder="Enter Name" className="form-control " onChange={(e) => setNameFormValue(e.target.value)} value={nameFormValue} type="text" required></input>
                    <label className="control-label w-100" htmlFor="password">Image</label>
                    <input id="name" name="name" placeholder="Enter Image Url" className="form-control " onChange={(e) => setImageUrlFormValue(e.target.value)} value={imageUrlFormValue} type="text" required></input>
                    <label className="control-label w-100" htmlFor="email">Category</label>
                    <input id="email" name="email" placeholder="Enter Category" className="form-control" onChange={(e) => setCategoryFormValue(e.target.value)} value={categoryFormValue} type="text" required></input>
                  </div>
                  <div className="col-md-6">
                    <label className="control-label w-100" htmlFor="email">Label:</label>
                    <input id="Username" name="username" placeholder="Enter Label" className="form-control" onChange={(e) => setLabelFormValue(e.target.value)} value={labelFormValue} type="text"></input>
                    <label className="control-label w-100" htmlFor="password_confirm">Price:</label>
                    <input id="password_confirm" name="password_confirm" placeholder="Enter Price" className="form-control" onChange={(e) => setPriceFormValue(e.target.value)} value={priceFormValue} type="number" required></input>
                    <label className="control-label" htmlFor="contact">Description:</label>
                    <input id="contact" name="contact" placeholder="Enter Description" className="form-control" onChange={(e) => setDesciptionFormValue(e.target.value)} value={descriptionFormValue} type="text" required></input>
                  </div>
                  <div className="control-group pull-right text-right mt-2" >
                    <div className="btn btn-success" style={{ lineHeight: '1.4' }} data-dismiss="modal" onClick={addItemFunction}>Add</div>
                    <div className="form-control" type="button" data-dismiss="modal" style={{ marginTop: '0', maxWidth: '50px', textAlign: 'center', background: '#8e4646', fontSize: '1rem', color: '#fff', display: 'flex', justifyContent: 'center', height: '36px', marginLeft: '2px', float: 'right' }}>Close</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="footer" style={{
          position: 'fixed',
          background: 'black',
          bottom: '0',
          width: '100%',
          marginLeft: '0px'
        }}>
          <div className="container-fluid">
            <p className="text-muted">2023 © by G-Trac. </p>
          </div>
        </footer>
      </div>
    </>
  )
}

export default Finvestfx