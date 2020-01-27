'use strict';

class BlockContent extends React.Component {
	constructor(props) {
		/*
		 * Expected props:
		 * string blockTitle
		 * string[] paragraphs
		 * bool last
		 */
		super(props);
	}

	render() {
		let paragraphs = [];
		for (let i = 0; i < this.props.paragraphs.length; i++) {
			paragraphs.push(
				<p key={this.props.blockTitle + i.toString()}
					dangerouslySetInnerHTML={{__html: this.props.paragraphs[i]}}
				>
				</p>
			);
		}
		let className = "block_content";
		if (this.props.last) {
			className += " last";
		}
		return (
			<div className={className}>
				<h1>{this.props.blockTitle}</h1>
				{paragraphs}
			</div>
		);
	}
}

class SectionContent extends React.Component {
	constructor(props) {
		/*
		 * Expected props:
		 * string sectionTitle
		 * {string blockTitle, string[] paragraphs}[] blocks
		 */
		super(props);
	}

	render() {
		let blocks = [];
		for (let i = 0; i < this.props.blocks.length; i++) {
			blocks.push(
			<BlockContent 
				key={this.props.sectionTitle + i.toString()}
				blockTitle={this.props.blocks[i].blockName}
				paragraphs={this.props.blocks[i].paragraphs} last={i == this.props.blocks.length - 1}
			/>); 
		}

		return (
			<div className="block_section">	
				<div className="label_content">
					<h1>{this.props.sectionTitle}</h1>
				</div>
				<div className="space"></div>
				{blocks}
			</div>
		);
	}
}

class InternalContent extends React.Component {
	constructor(props) {
		/*
		 * Expected props:
		 * {string sectionTitle, {string blockTitle, string[] paragraphs}[]}[] content
		 */
		super(props);
	}

	render() {
		let sections = [];
		for (let i = 0; i < this.props.content.length; i++) {
			sections.push(
			<SectionContent 
				key={"section" + i.toString()}
				sectionTitle={this.props.content[i].sectionName}
				blocks={this.props.content[i].blocks}
			/>);
		}

		return sections;
	}
}

//Load the content from the JSON file
$.ajax({
	dataType: "json",
	url: "../assets/blocks.json",
	success: function(data) {	
		ReactDOM.render(<InternalContent content={data}/>, document.getElementById('internal_content'));
	}
});

