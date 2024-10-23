export { tocData }

// convert lines to arrays if needing to allow on different platforms
// join arrays when calling function
let tocData = {
    "testUrls": testUrls(),
    "espeak-ng-docs": espeak(),
    "pandoc": pandoc(),
    "jsFpAllonge": jsFpAllonge(),
    "vscodeDocs": vscodeDocs(),
    "crafting-interpreters": craftingInterpreters(),
    "ydkjs": ydkjs(),
}


function testUrls() {

    let toc = {

        docs: `
https://en.wikipedia.org/wiki/wikipedia
`,

    }

    return toc

}

function pandoc() {
    let toc = {
        manual: `
MANUAL.txt
`,
        docs: `
doc/custom-readers.md
doc/custom-writers.md
doc/customizing-pandoc.md
doc/epub.md
doc/extras.md
doc/faqs.md
doc/filters.md
doc/getting-started.md
doc/jats.md
doc/libraries.md
doc/lua-filters.md
doc/nix.md
doc/org.md
doc/pandoc-lua.md
doc/pandoc-server.md
doc/press.md
doc/short-guide-to-pandocs-sources.md
doc/typst-property-output.md
doc/using-the-pandoc-api.md

`,

    }


    return toc

}



function espeak() {
    let toc = {
        main: `
add_language.md
building.md
contributing.md
dictionary.md
guide.md
index.md
integration.md
intonation.md
languages.md
markup.md
mbrola.md
numbers.md
phoneme_model.md
phonemes.md
phontab.md
voices.md
`,

        phonemes: `
phonemes/cxs.md
phonemes/kirshenbaum.md
phonemes/xsampa.md
`,

        languages: `
languages/gmw/en.md
languages/gmw/lb.md
languages/iro/chr.md
`
    }


    return toc

}


function ydkjs() {
    let toc = {
        "you-dont-know-js": `
toc.md
README.md
ch1.md
ch2.md
ch3.md
ch4.md
ch5.md
apA.md
apB.md
apC.md
apD.md
`
    }
    return toc
}


function vscodeDocs() {
    let toc = `
your-first-extension.md
extension-anatomy.md
wrapping-up.md


overview.md
syntax-highlight-guide.md
semantic-highlight-guide.md
embedded-languages.md
programmatic-language-features.md
language-configuration-guide.md
snippet-guide.md
language-server-extension-guide.md
`
    return toc
}



function jsFpAllonge() {
    let toc = `
markdown/Prefaces/title.md
markdown/Prefaces/fogus.md
markdown/Prefaces/matthewknox.md
markdown/Prefaces/about.md
markdown/Prefaces/recipes.md
markdown/Prefaces/legend.md
markdown/Prefaces/six.md
markdown/prelude.md
markdown/carmack.md

markdown/Functions/title.md
markdown/Functions/little.md
markdown/Functions/args.md
markdown/Functions/closures.md
markdown/Functions/letvar.md
markdown/Functions/names.md
markdown/Functions/combinators.md
markdown/Functions/buildingblocks.md
markdown/Functions/args-again.md
markdown/Functions/summary.md
markdown/cheat-sheet.md
markdown/Functions/recipes/title.md
markdown/Functions/recipes/partial.md
markdown/Functions/recipes/ellipses.md
markdown/Functions/recipes/unary.md
markdown/Functions/recipes/tap.md
markdown/Functions/recipes/maybe.md

markdown/References and Rebinding/title.md
markdown/References and Rebinding/references.md
markdown/References and Rebinding/arrays.md
markdown/References and Rebinding/objects.md
markdown/References and Rebinding/reassignment.md
markdown/References and Rebinding/var.md
markdown/References and Rebinding/recursion.md
markdown/References and Rebinding/modules.md
markdown/References and Rebinding/summary.md
markdown/References and Rebinding/recipes/title.md
markdown/References and Rebinding/recipes/once.md
markdown/References and Rebinding/recipes/map-with.md
markdown/References and Rebinding/recipes/flip.md
markdown/References and Rebinding/recipes/extend.md
markdown/References and Rebinding/recipes/y.md

markdown/Objects, Mutation, and State/title.md
markdown/Objects, Mutation, and State/encapsulation.md
markdown/Objects, Mutation, and State/composition-and-extension.md
markdown/Objects, Mutation, and State/this.md
markdown/Objects, Mutation, and State/context.md
markdown/Objects, Mutation, and State/method-decorators.md
markdown/Objects, Mutation, and State/summary.md
markdown/Objects, Mutation, and State/recipes/title.md
markdown/Objects, Mutation, and State/recipes/memoize.md
markdown/Objects, Mutation, and State/recipes/get-with.md
markdown/Objects, Mutation, and State/recipes/pluck.md
markdown/Objects, Mutation, and State/recipes/deep-map-with.md

markdown/Instances and Classes/title.md
markdown/Instances and Classes/simple.md
markdown/Instances and Classes/binding.md
markdown/Instances and Classes/revisiting-partial.md
markdown/Instances and Classes/class.md
markdown/Instances and Classes/object-methods.md
markdown/Instances and Classes/extends.md
markdown/Instances and Classes/summary.md
markdown/Instances and Classes/recipes/title.md
markdown/Instances and Classes/recipes/curry.md
markdown/Instances and Classes/recipes/bound.md
markdown/Instances and Classes/recipes/unbind.md
markdown/Instances and Classes/recipes/send.md
markdown/Instances and Classes/recipes/invoke.md
markdown/Instances and Classes/recipes/fluent.md
markdown/Instances and Classes/recipes/named-once.md

markdown/Sequence/title.md
markdown/Sequence/compose-and-pipeline.md
markdown/Ideas/title.md
markdown/Ideas/prototype.md
markdown/Ideas/agnostic.md
markdown/Ideas/functional-mixins.md
markdown/Ideas/class-decorators.md
markdown/Ideas/turtles.md
markdown/Ideas/iterators.md
markdown/Ideas/drunken.md
markdown/Ideas/trampolining.md
markdown/Ideas/recipes/title.md
markdown/Ideas/recipes/before.md
markdown/Ideas/recipes/after.md
markdown/Ideas/recipes/provided.md
markdown/Ideas/recipes/functional-mixin.md
markdown/Ideas/recipes/class-decorator.md
markdown/Ideas/recipes/iterator-recipes.md

markdown/Appendices/title.md
markdown/Appendices/authornotes.md
markdown/Appendices/examples.md
markdown/Appendices/thanks.md
markdown/Appendices/spessore.md
markdown/Appendices/copyright.md
markdown/Appendices/image_copyrights.md
markdown/Appendices/reg.md
`

    return toc
}


function craftingInterpreters() {
    let toc = {
        frontmatter: `
        404.html
        contents.html
        dedication.html
        acknowledgements.html
        `,

        introduction: `
        welcome.html
        introduction.html
        a-map-of-the-territory.html
        the-lox-language.html
        `,

        "java-interpreter-part-1": `
        a-tree-walk-interpreter.html
        scanning.html
        representing-code.html
        parsing-expressions.html
        `,

        "java-interpreter-part-2": `
        evaluating-expressions.html
        statements-and-state.html
        control-flow.html
        resolving-and-binding.html
        functions.html
        classes.html
        inheritance.html
        `,

        "c-interpreter": `
        a-bytecode-virtual-machine.html
        chunks-of-bytecode.html
        scanning-on-demand.html
        a-virtual-machine.html
        compiling-expressions.html
        types-of-values.html
        strings.html
        hash-tables.html
        global-variables.html
        local-variables.html
        calls-and-functions.html
        closures.html
        jumping-back-and-forth.html
        garbage-collection.html
        classes-and-instances.html
        methods-and-initializers.html
        optimization.html
        superclasses.html
        `,

        backmatter: `
        backmatter.html
        appendix-i.html
        appendix-ii.html
        `,
    }
    return toc
}

