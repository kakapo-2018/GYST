import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    digit: {
        width:'80px',
        flexDirection: 'row',
        display: 'inline-block',
    }

});


class Bell extends React.Component {

    constructor(props){
        super(props)
        this.state ={
            bell: this.props.bells[0],
            inputURL: '',
            errorFile: false,
            errorURL: false
        }
    }
 
    ring(){
        this.refs.audio.getDOMNode().load();
        this.refs.audio.getDOMNode().play();
    }

    getDefaultProps(){
        return {
            bells: [],
            onAddAudio: function(file) { console.log(file); }
        };
    }

    handleChange(event){
        var key = event.target.value;
        this.setState({
            bell: this.props.bells[key]
        });
    }

    handlePlay(){
        this.refs.audio.getDOMNode().load();
        this.refs.audio.getDOMNode().play();
    }

    handleInputURL(event) {
        this.setState({ inputURL: event.target.value })
    }

    handleStop(){
        this.refs.audio.getDOMNode().pause();
    }

    handleAddLocalSound(event){
        var supportAudioType = ['audio/ogg', 'audio/webm', 'audio/mpeg', 'audio/ogg', 'audio/wav', 'audio/x-wav', 'audio/mp3', 'audio/mp4', 'audio/flac', 'audio/x-flac'];
        var file = event.target.files[0];
        var ext = getExt(file.name);
        var type = file.type ? file.type : ext2mime(ext);

        if (supportAudioType.indexOf(type) !== -1) {
            this.props.onAddAudio({name: file.name, type: type, path: URL.createObjectURL(file)});
            this.setState({ errorFile: false, errorURL: false });
        } else {
            console.error('Unsupported audio type: ' + file.type);
            this.setState({ errorFile: true });
        }
    }

    handleAddAudioURL(event){
        var url = this.state.inputURL;
        var ext = getExt(url);
        var type = ext2mime(ext);
        if (isValidUrl(url) && type) {
            this.props.onAddAudio({name: url.split('/').pop(), path: url, type: type});
            this.setState({ errorFile: false, errorURL: false, inputURL: '' });
        } else {
            this.setState({ errorURL: true });
        }
    }

    render() {
        const { classes } = this.props;
        var options = this.props.bells.map(function(bell, i){
            return (
                <option value={i} key={i} >{bell.name}</option>
            );
        });

        var errorAlert = <div className="alert alert-danger">Unsupported audio type</div>;
        
        return (
            <div className="bell">
                <audio ref="audio" loop>
                    <source src={this.state.bell.path}/>
                    Your browser does not support the audio element.
                </audio>
               <div className="form">
                    <div className="form-group form-inline">
                        <select className="form-control" onChange={this.handleChange}>
                            {options}
                        </select>
                        <button className="btn btn-primary" onClick={this.handlePlay}><span className="glyphicon glyphicon-play"></span></button>
                        <button className="btn btn-default" onClick={this.handleStop}><span className="glyphicon glyphicon-stop"></span></button>
                    </div>
                    <div className="form-group">
                        <label>Local audio file</label>
                        <div className="form-group">
                            <label htmlFor="local-sound" className="btn btn-default">Browse...</label>
                            <input id="local-sound" className="hidden" type="file" onChange={this.handleAddLocalSound}/>
                        </div>
                        { this.state.errorFile ? errorAlert : undefined }
                    </div>
                    <div className="form-group">
                        <label>Audio URL</label>
                        <div className="form-group form-inline">
                            <input className="form-control" onChange={this.handleInputURL} value={this.state.inputURL}/>
                            <button className="btn btn-default" onClick={this.handleAddAudioURL}>Add</button>
                        </div>
                        { this.state.errorURL ? errorAlert : undefined }
                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Bell);

