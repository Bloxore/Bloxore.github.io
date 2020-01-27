'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BlockContent = function (_React$Component) {
	_inherits(BlockContent, _React$Component);

	function BlockContent(props) {
		_classCallCheck(this, BlockContent);

		/*
   * Expected props:
   * string blockTitle
   * string[] paragraphs
   * bool last
   */
		return _possibleConstructorReturn(this, (BlockContent.__proto__ || Object.getPrototypeOf(BlockContent)).call(this, props));
	}

	_createClass(BlockContent, [{
		key: "render",
		value: function render() {
			var paragraphs = [];
			for (var i = 0; i < this.props.paragraphs.length; i++) {
				paragraphs.push(React.createElement("p", { key: this.props.blockTitle + i.toString(),
					dangerouslySetInnerHTML: { __html: this.props.paragraphs[i] }
				}));
			}
			var className = "block_content";
			if (this.props.last) {
				className += " last";
			}
			return React.createElement(
				"div",
				{ className: className },
				React.createElement(
					"h1",
					null,
					this.props.blockTitle
				),
				paragraphs
			);
		}
	}]);

	return BlockContent;
}(React.Component);

var SectionContent = function (_React$Component2) {
	_inherits(SectionContent, _React$Component2);

	function SectionContent(props) {
		_classCallCheck(this, SectionContent);

		/*
   * Expected props:
   * string sectionTitle
   * {string blockTitle, string[] paragraphs}[] blocks
   */
		return _possibleConstructorReturn(this, (SectionContent.__proto__ || Object.getPrototypeOf(SectionContent)).call(this, props));
	}

	_createClass(SectionContent, [{
		key: "render",
		value: function render() {
			var blocks = [];
			for (var i = 0; i < this.props.blocks.length; i++) {
				blocks.push(React.createElement(BlockContent, {
					key: this.props.sectionTitle + i.toString(),
					blockTitle: this.props.blocks[i].blockName,
					paragraphs: this.props.blocks[i].paragraphs, last: i == this.props.blocks.length - 1
				}));
			}

			return React.createElement(
				"div",
				{ className: "block_section" },
				React.createElement(
					"div",
					{ className: "label_content" },
					React.createElement(
						"h1",
						null,
						this.props.sectionTitle
					)
				),
				React.createElement("div", { className: "space" }),
				blocks
			);
		}
	}]);

	return SectionContent;
}(React.Component);

var InternalContent = function (_React$Component3) {
	_inherits(InternalContent, _React$Component3);

	function InternalContent(props) {
		_classCallCheck(this, InternalContent);

		/*
   * Expected props:
   * {string sectionTitle, {string blockTitle, string[] paragraphs}[]}[] content
   */
		return _possibleConstructorReturn(this, (InternalContent.__proto__ || Object.getPrototypeOf(InternalContent)).call(this, props));
	}

	_createClass(InternalContent, [{
		key: "render",
		value: function render() {
			var sections = [];
			for (var i = 0; i < this.props.content.length; i++) {
				sections.push(React.createElement(SectionContent, {
					key: "section" + i.toString(),
					sectionTitle: this.props.content[i].sectionName,
					blocks: this.props.content[i].blocks
				}));
			}

			return sections;
		}
	}]);

	return InternalContent;
}(React.Component);

//Load the content from the JSON file


$.ajax({
	dataType: "json",
	url: "../assets/blocks.json",
	success: function success(data) {
		ReactDOM.render(React.createElement(InternalContent, { content: data }), document.getElementById('internal_content'));
	}
});