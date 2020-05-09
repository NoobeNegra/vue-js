Vue.component('toolDescriptionComponent', {
    template: '#tool-description-template',
    data() {
        return { tool: null, hide: true }
    },
    methods: {
        showInfo: function (toolId) {
            this.hide = false;
            axios
                .get('http://localhost:8000/api/tool/' + toolId)
                .then(response => (this.tool = response.data))
        },
        askToBorrow: function () {
            console.log('ok');
        },
        back: function () {
            this.hide = true;
            this.$emit('showtoollist');
        },
        showOwner: function (ownerId) {
            this.hide = true;
            this.$emit('showuserinfo', ownerId);
        }
    },
    computed: {
        owner() { return this.tool.user.name + ' ' + this.tool.user.surename },
        ownerid() { return this.tool.user.id },
        exchanges() { return this.tool.exchanges },
        comments() { return this.tool.comments }
    },
});

Vue.component('userInformationTemplate', {
    template: '#user-information-template',
    data() {
        return {
            user: null,
            hide: true,
            toolid: null
        }
    },
    methods: {
        showInfo: function (userId, toolId) {
            this.hide = false;
            this.toolid = toolId;
            axios
                .get('http://localhost:8000/api/user/' + userId)
                .then(response => (this.user = response.data))
        },
        back: function () {
            this.hide = true;
            this.$emit('showtoolinformation', this.toolid);
        }
    },
    computed: {
        name() { return this.user.name + ' ' + this.user.surename },
        comments() { return this.user.comments }
    },
});

Vue.component('toolListComponent', {
    template: '#tool-list-template',
    data() {
        return {
            listTools: null,
            shouldHide: false
        }
    },
    methods: {
        showTool: function (toolId) {
            this.shouldHide = true;
            this.$emit('showtoolinformation', toolId);
        },
        show: function () {
            this.shouldHide = false;
        }
    },
    mounted() {
        axios
            .get('http://localhost:8000/api/tools')
            .then(response => (this.listTools = response.data))
    }
});

new Vue({
    el: '#container',
    methods: {
        showtoolinformation: function (toolId) {
            this.$refs.descriptioncomponent.showInfo(toolId);
        },
        showtoollist: function () {
            this.$refs.toollistcomponent.show();
        },
        showuserinfo: function (ownerId) {
            this.$refs.userinfocomponent.showInfo(ownerId);
        }
    },
});
