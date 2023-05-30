import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { saveNewProduct } from "../../redux/list.slice";
import { updateProductList } from "../../redux/list.slice";
// import { fetchFactor } from "../../redux/factor.slice";
// import { fetchWeightFactor } from "../../redux/weightFactor.slice";


import './productDetail.styles.css'

const ProductDetail = () => {
    const dispatch = useDispatch(); 
    const navigate = useNavigate();
    const [check, setCheck] = useState(true);
    const list = useSelector(state => state.list.list)
    let { id:idParam } = useParams();
    let findProduct = {};
    if(idParam !== 'new') {
        findProduct = list.find(item => item.id === Number(idParam));
    }
    console.log(idParam)
    
    const [name, setName] = useState('');
    const [weight, setWeight] = useState('Low'); 
    const [ei, setEi] = useState('');
    const [weightEi, setWeightEi] = useState('');
    const [eo, setEo] = useState('');
    const [weightEo, setWeightEo] = useState('');
    const [eq, setEq] = useState('');
    const [weightEq, setWeightEq] = useState('');
    const [ilf, setIlf] = useState('');
    const [weightIlf, setWeightIlf] = useState('');
    const [eif, setEif] = useState('');
    const [weightEif, setWeightEif] = useState('');
    //factor
    const [dc, setDc] = useState('0');
    const [ddp, setDdp] = useState('0');
    const [per, setPer] = useState('0');
    const [huc, setHuc] = useState('0');
    const [tr, setTr] = useState('0');
    const [ode, setOde] = useState('0');
    const [eue, setEue] = useState('0');
    const [olu, setOlu] = useState('0');
    const [cp, setCp] = useState('0');
    const [reu, setReu] = useState('0');
    const [ie, setIe] = useState('0');
    const [oe, setOe] = useState('0');
    const [ms, setMs] = useState('0');
    const [fc, setFc] = useState('0');

    const [vl, setVl] = useState(''); //value language
    const [textLanguage, setTextLanguage] = useState('');
    const [lineOfDay, setLineOfDay] = useState('');


    useEffect(() => {
        if(idParam !== 'new') {
            setName(findProduct.name);
            setWeight(findProduct.weight);
            setEi(findProduct.ei);
            setWeightEi(findProduct.weightEi);
            setEo(findProduct.eo);
            setWeightEo(findProduct.weightEo);
            setEq(findProduct.eq);
            setWeightEq(findProduct.weightEq);
            setIlf(findProduct.ilf);
            setWeightIlf(findProduct.weightIlf);
            setEif(findProduct.eif);
            setWeightEif(findProduct.weightEif)

            setDc(findProduct.dc);
            setDdp(findProduct.ddp);
            setPer(findProduct.per);
            setHuc(findProduct.huc);
            setTr(findProduct.tr);
            setOde(findProduct.ode);
            setEue(findProduct.eue);
            setOlu(findProduct.olu);
            setCp(findProduct.cp);
            setReu(findProduct.reu);
            setIe(findProduct.ie);
            setOe(findProduct.oe);
            setMs(findProduct.ms);
            setFc(findProduct.fc);

            setVl(findProduct.vl)
            setTextLanguage(findProduct.textLanguage)
            setLineOfDay(findProduct.lineOfDay)
        }
    }, [])

    const handleSelectLanguageChange = (event) => {
        const selectedOption = event.target.options[event.target.selectedIndex];
        setVl(selectedOption.dataset.value);
        setTextLanguage(selectedOption.textContent)
    }

    const weightLow = {
        weightOptionEi: '3',
        weightOptionEo: '4',
        weightOptionEq: '3',
        weightOptionEif: '5',
        weightOptionIlf: '7',
    }

    const weightAverage = {
        weightOptionEi: '4',
        weightOptionEo: '5',
        weightOptionEq: '4',
        weightOptionEif: '7',
        weightOptionIlf: '10',
    }
    
    const weightHigh = {
        weightOptionEi: '6',
        weightOptionEo: '7',
        weightOptionEq: '6',
        weightOptionEif: '10',
        weightOptionIlf: '15',
    }

    useEffect(() => {
        if(weight === 'Low') {
            setWeightEi(weightLow.weightOptionEi);
            setWeightEo(weightLow.weightOptionEo);
            setWeightEq(weightLow.weightOptionEq);
            setWeightEif(weightLow.weightOptionEif);
            setWeightIlf(weightLow.weightOptionIlf);
        } else if(weight === 'Average') {
            setWeightEi(weightAverage.weightOptionEi);
            setWeightEo(weightAverage.weightOptionEo);
            setWeightEq(weightAverage.weightOptionEq);
            setWeightEif(weightAverage.weightOptionEif);
            setWeightIlf(weightAverage.weightOptionIlf);
        } else if (weight === 'High') {
            setWeightEi(weightHigh.weightOptionEi);
            setWeightEo(weightHigh.weightOptionEo);
            setWeightEq(weightHigh.weightOptionEq);
            setWeightEif(weightHigh.weightOptionEif);
            setWeightIlf(weightHigh.weightOptionIlf);
        }
    },[weight])

    const onSubmithandle = (event) => {
        event.preventDefault();
        if( name !== '' && eo !== '' && ei !== '' && eq !== '' && ilf !== '' && eif !=='' && vl !== '') {
            setCheck(true);
            if(idParam === 'new') {
                const vaf =  0.65 + 0.01*(
                    Number(dc) + Number(ddp)
                    + Number(per) + Number(huc)
                    + Number(tr) + Number(ode)
                    + Number(eue) + Number(olu)
                    + Number(cp) + Number(reu)
                    + Number(ie) + Number(oe)
                    + Number(ms) + Number(fc)
                );
                const ufc = ei*weightEi + eo*weightEo + eq*weightEq + ilf*weightIlf + eif*weightEif;
                const funcPoint = vaf*ufc;
                const effort = (vl * funcPoint)/Number(lineOfDay);
                const newProduct = {
                    name,
                    weight, 
                    ei, weightEi, 
                    eo, weightEo,
                    eq, weightEq,
                    ilf, weightIlf,
                    eif, weightEif,
                    dc,
                    ddp,
                    per,
                    huc,
                    tr,
                    ode,
                    eue,
                    olu,
                    cp,
                    reu,
                    ie,
                    oe,
                    ms,
                    fc,
                    vaf,
                    ufc,
                    funcPoint,
                    vl, 
                    textLanguage,
                    lineOfDay,
                    effort,
                }
                dispatch(saveNewProduct(newProduct))
            } else {
                const vaf =  0.65 + 0.01*(
                    Number(dc) + Number(ddp)
                    + Number(per) + Number(huc)
                    + Number(tr) + Number(ode)
                    + Number(eue) + Number(olu)
                    + Number(cp) + Number(reu)
                    + Number(ie) + Number(oe)
                    + Number(ms) + Number(fc)
                );
                const ufc = ei*weightEi + eo*weightEo + eq*weightEq + ilf*weightIlf + eif*weightEif;
                const funcPoint = vaf*ufc;
                const effort = (vl * funcPoint)/Number(lineOfDay);
                const productEdit = {
                    id: findProduct.id,
                    name,
                    weight, 
                    ei, weightEi, 
                    eo, weightEo,
                    eq, weightEq,
                    ilf, weightIlf,
                    eif, weightEif,
                    dc,
                    ddp,
                    per,
                    huc,
                    tr,
                    ode,
                    eue,
                    olu,
                    cp,
                    reu,
                    ie,
                    oe,
                    ms,
                    fc,
                    vaf,
                    ufc,
                    funcPoint,
                    vl, 
                    textLanguage,
                    lineOfDay,
                    effort,
                }
                dispatch(updateProductList(productEdit));
            }
            alert('Lưu thành công');
            navigate('/');
        } else {
            setCheck(false)
        }
    }
    
    return (
        <div className="product-detail">
            <div className="header">
                <h2>Product Detail</h2>
            </div>
            <form
                onSubmit={onSubmithandle}
            >
                <div className="form-box__input-container">
                     <label className="label">Product Name</label>
                     <input 
                        className="input"
                        placeholder="Product Name..."
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                     />
                </div>
                {((!check) && (name === '')) && <label className="label label--error">Can't be left empty</label>}
                <div className="form-box__input-container">
                     <label className="label">EI</label>
                     <div className='form-input'>
                        <input
                            type="number"  
                            className="input"
                            placeholder="EI..."
                            min={0}
                            // min={0}
                            value={ei}
                            onChange={(event) => setEi(event.target.value)}
                        />
                     </div>
                     {((!check) && (ei === '')) && <label className="label label--error">Can't be left empty</label>}
                </div>
                <div className="form-box__input-container">
                     <label className="label">EO</label>
                     <div className='form-input'>
                        <input 
                            type="number" 
                            className="input"
                            placeholder="EO..."
                            min={0}
                            value={eo}
                            onChange={(event) => setEo(event.target.value)}
                        />
                    </div>
                    {((!check) && (eo === '')) && <label className="label label--error">Can't be left empty</label>}
                </div>
                <div className="form-box__input-container">
                     <label className="label">EQ</label>
                     <div className='form-input'>
                        <input 
                            type="number"  
                            className="input"
                            placeholder="EQ..."
                            value={eq}
                            min={0}
                            onChange={(event) => setEq(event.target.value)}
                        />
                     </div>
                     {((!check) && (eq === '')) && <label className="label label--error">Can't be left empty</label>}
                </div>
                <div className="form-box__input-container">
                     <label className="label">ILF</label>
                     <div className="form-input">
                        <input
                            type="number"   
                            className="input"
                            placeholder="ILF..."
                            value={ilf}
                            min={0}
                            onChange={(event) => setIlf(event.target.value)}
                        />
                     </div>
                     {((!check) && (ilf === '')) && <label className="label label--error">Can't be left empty</label>}
                </div>
                <div className="form-box__input-container">
                     <label className="label">EIF</label>
                     <div className="form-input">
                        <input 
                            type="number" 
                            className="input"
                            placeholder="EIF..."
                            value={eif}
                            min={0}
                            onChange={(event) => setEif(event.target.value)}
                        />
                     </div>
                     {((!check) && (eif === '')) && <label className="label label--error">Can't be left empty</label>}
                </div>
                {/* <div className='func-weight'> */}
                <div className="form-box__input-container">
                    <label className="label">Weight:</label>
                    <select 
                        // className='choose-weight'
                        className="input"
                        value={weight}
                        onChange={(event) => setWeight(event.target.value)}     
                    >   
                        <option>Low</option>
                        <option>Average</option>
                        <option>High</option>
                    </select>
                </div>
                <div className="form-box__input-container">
                     <label className="label">Factor:</label>
                     <div className="form-factor">
                        <div className="factor">
                            <div className="name-item">Data Communications</div>
                            <select
                                className='choose-weight'
                                value={dc}
                                onChange={(event) => setDc(event.target.value)}
                            >   
                                <option>0</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                        <div className="factor">
                            <div className="name-item">Distributed Data Processing</div>
                            <select
                                className='choose-weight'
                                value={ddp}
                                onChange={(event) => setDdp(event.target.value)}
                            >
                                <option>0</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                        <div className="factor">
                            <div className="name-item">Performance</div>
                            <select
                                className='choose-weight'
                                value={per}
                                onChange={(event) => setPer(event.target.value)}
                            >
                                <option>0</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                        <div className="factor">
                            <div className="name-item">Heavily Used Configuaration</div>
                            <select
                                className='choose-weight'
                                value={huc}
                                onChange={(event) => setHuc(event.target.value)}
                            >
                                <option>0</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                        <div className="factor">
                            <div className="name-item">Transaction Rate</div>
                            <select
                                className='choose-weight'
                                value={tr}
                                onChange={(event) => setTr(event.target.value)}
                            >
                                <option>0</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                        <div className="factor">
                            <div className="name-item">On-line Data Entry</div>
                            <select
                                className='choose-weight'
                                value={ode}
                                onChange={(event) => setOde(event.target.value)}
                            >
                                <option>0</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                        <div className="factor">
                            <div className="name-item">End-User Efficiency</div>
                            <select
                                className='choose-weight'
                                value={eue}
                                onChange={(event) => setEue(event.target.value)}
                            >
                                <option>0</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                        <div className="factor">
                            <div className="name-item">On-line Update</div>
                            <select
                                className='choose-weight'
                                value={olu}
                                onChange={(event) => setOlu(event.target.value)}
                            >
                                <option>0</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                        <div className="factor">
                            <div className="name-item">Complex Processing</div>
                            <select
                                className='choose-weight'
                                value={cp}
                                onChange={(event) => setCp(event.target.value)}
                            >
                                <option>0</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                        <div className="factor">
                            <div className="name-item">Reusability</div>
                            <select
                                className='choose-weight'
                                value={reu}
                                onChange={(event) => setReu(event.target.value)}
                            >
                                <option>0</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                        <div className="factor">
                            <div className="name-item">Installation Ease</div>
                            <select
                                className='choose-weight'
                                value={ie}
                                onChange={(event) => setIe(event.target.value)}
                            >
                                <option>0</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                        <div className="factor">
                            <div className="name-item">Operational Ease</div>
                            <select
                                className='choose-weight'
                                value={oe}
                                onChange={(event) => setOe(event.target.value)}
                            >
                                <option>0</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                        <div className="factor">
                            <div className="name-item">Multiple Sites</div>
                            <select
                                className='choose-weight'
                                value={ms}
                                onChange={(event) => setMs(event.target.value)}
                            >
                                <option>0</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                        <div className="factor">
                            <div className="name-item">Faciliate Change</div>
                            <select
                                className='choose-weight'
                                value={fc}
                                onChange={(event) => setFc(event.target.value)}
                            >
                                <option>0</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                     </div>
                </div>
                <div className="line"></div>
                <div>
                    UFC: {
                        ei*weightEi 
                        + eo*weightEo 
                        + eq*weightEq 
                        + ilf*weightIlf 
                        + eif*weightEif
                    }
                </div>
                <div>
                    VAF: {
                        0.65 + 0.01*(
                        Number(dc) + Number(ddp)
                        + Number(per) + Number(huc)
                        + Number(tr) + Number(ode)
                        + Number(eue) + Number(olu)
                        + Number(cp) + Number(reu)
                        + Number(ie) + Number(oe)
                        + Number(ms) + Number(fc)
                        )
                    }    
                </div>
                <div>
                    Function point: {
                        (
                            ei*weightEi 
                            + eo*weightEo 
                            + eq*weightEq 
                            + ilf*weightIlf 
                            + eif*weightEif
                        )
                        *
                        (
                            0.65 + 0.01*(
                                Number(dc) + Number(ddp)
                                + Number(per) + Number(huc)
                                + Number(tr) + Number(ode)
                                + Number(eue) + Number(olu)
                                + Number(cp) + Number(reu)
                                + Number(ie) + Number(oe)
                                + Number(ms) + Number(fc)
                            )
                        )
                    }
                </div>
                <div className="pad">
                    Language:
                    <select
                        className='choose-weight'
                        data-value={vl}
                        value={textLanguage}
                        // onChange={(event) => setVl(event.target.value)}
                        onChange={handleSelectLanguageChange}
                    >
                        <option></option>
                        <option data-value={100}>C</option>
                        <option data-value={30}>C#</option>
                        <option data-value={20}>Python</option>
                        <option data-value={50}>Java</option>
                        <option data-value={100}>C++</option>
                        <option data-value={40}>Javascript</option>
                        <option data-value={20}>Ruby</option>
                        <option data-value={60}>PHP</option>
                        <option data-value={15}>Swift</option>
                    </select>
                    {((!check) && (vl === '')) && <label className="label label--error">Can't be left empty</label>}
                </div>
                <div className="pad">
                    Average number of lines of code of 1 engineer/day:
                    <input 
                            type="number"  
                            className="choose-weight input-line"
                            min={0}
                            // placeholder="Average number of lines of code of 1 engineer/day..."
                            value={lineOfDay}
                            onChange={(event) => setLineOfDay(event.target.value)}
                    />
                    {((!check) && (lineOfDay === '')) && <label className="label label--error">Can't be left empty</label>}
                </div>
                <div>
                    Effort: {
                        (vl * (
                            ei*weightEi 
                            + eo*weightEo 
                            + eq*weightEq 
                            + ilf*weightIlf 
                            + eif*weightEif
                        )
                        *
                        (
                            0.65 + 0.01*(
                                Number(dc) + Number(ddp)
                                + Number(per) + Number(huc)
                                + Number(tr) + Number(ode)
                                + Number(eue) + Number(olu)
                                + Number(cp) + Number(reu)
                                + Number(ie) + Number(oe)
                                + Number(ms) + Number(fc)
                            )
                        ))/Number(lineOfDay)
                    }
                </div>
                <span className='save'>
                    <button className='primary-btn' type='submit'>
                    {/* <button className='primary-btn'> */}
                        Save
                    </button>
                </span>
            </form>
        </div>
    )
}

export default ProductDetail;