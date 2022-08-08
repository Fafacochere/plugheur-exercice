import { AutoComplete } from "antd";
import { useContext, useState } from "react";
import { metricsContext } from "../../App";
import { serialNumbersList } from "../../interfaces/SerialNumbers";
import { getAllSerialNumbers, getDataBySerialNumber } from "../../service/DataService";
import './search-form.scss';

const { Option } = AutoComplete;


function SearchBar() {
	const [serialsList, setSerialList] = useState<string[]>([]);
	const [searchValue, setSearchValue] = useState('');
	const [error, setError] = useState('');
	const { dispatch }  = useContext(metricsContext);

	if (serialsList.length === 0) {
		getAllSerialNumbers().then((serials: serialNumbersList) => {
			setSerialList(serials.data)
		});
	}

	const submitSerial = () => {
		getDataBySerialNumber(searchValue).then((response) => {
			if (response.message) {
				setError(response.message);
				return;
			}
			dispatch({type: 'UPDATE_METRICS', payload: response})
			setError('');
		});
	}

	const onChange = (data: string) => {
		setSearchValue(data);
	};

	return (
		<div className='search-form'>
			<label>
					Please enter a serial number&nbsp;: 
			</label>
			<AutoComplete
				style={{ width: '100%' }}
				onChange={onChange}
				placeholder="Select one serial number"
			>
				{ serialsList.map((serial, index) => {
					return <Option key={index} value={serial}>{serial}</Option>
				})}
			</AutoComplete>
			<button className="btn" onClick={submitSerial}>Search Data </button>
			<div className="text-danger"> { error ?? null } </div>
		</div>
	);
}
	
export default SearchBar;