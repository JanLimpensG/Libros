import {FormControl, FormLabel, RadioGroup as MuiRadioGroup,  FormControlLabel, } from '@material-ui/core';

import Radio from '@material-ui/core/Radio';
import React from 'react'

export default function RadioGroup(props) {

    const {name, label, value, items, onChange} = props;
    return (
        <FormControl>
            <FormLabel>{label}</FormLabel>
            <MuiRadioGroup row
                name={name}
                value={value}
                onChange={onChange} >

                {
                    items.map(
                        (item, index) => (
                            <FormControlLabel key={item.id} value={item.id} control={<Radio />} label = {item.title}/>
                        )
                    )
                }
            </MuiRadioGroup>
        </FormControl>
    )
}
