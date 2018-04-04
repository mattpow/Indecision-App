import React from 'react';
import AddOption from './AddOption';
import Options from './Options';
import Header from './Header';
import Action from './Action';
import OptionModal from './OptionModal';

export default class IndecisionApp extends React.Component {
    state = {
        options: [],
        selectedOption: undefined
    }

    dismissModal = () => {
        this.setState(() => ({
            selectedOption: undefined
        }));
    }

    removeAllOptions = () => {
        this.setState(() => ({ options: [] }));
    }

    removeIndividualOption = (optionToRemove) => {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => optionToRemove !== option )
        }));
    }

    makeDecision = () => {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        this.setState(() => ({
            selectedOption: option
        }));
        // alert(option);
    }

    addNewOption = (option) => {
        if (!option) {
            return 'Enter valid value to add item';
        } else if (this.state.options.indexOf(option) > -1) {
            return 'This option already exists';
        }

        this.setState((prevState) => ({ options: prevState.options.concat(option) }));
    }

    componentDidMount() {
        try {
            console.log("fetching options data");
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
            if (options) {
                this.setState(() => ({ options }));
            }
        } catch (e) {

        }        
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.options.length !== this.state.options.length) {
            console.log("saving options data");
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
    }

    render() {
        return (
            <div>
                <Header />
                <div className="container">
                    <Action 
                        hasOptions={this.state.options.length > 0} 
                        makeDecision={this.makeDecision}    
                    />
                    <div className="widget">
                        <Options 
                            options={this.state.options} 
                            removeAllOptions={this.removeAllOptions}    
                            removeIndividualOption={this.removeIndividualOption}
                        />
                        <AddOption 
                            addNewOption={this.addNewOption}
                        />
                    </div>
                </div>
                <OptionModal
                    selectedOption={this.state.selectedOption}
                    dismissModal={this.dismissModal}
                />
            </div>
        );
    }
}

IndecisionApp.defaultProps = {
    options: []
}