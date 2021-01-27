document.write(`
<div class="menu-and-content">
                    <div class="menu">
                        <div id="side-menu" class="side-menu">
                            <nav id="doc-menu" class="nav doc-menu sticky">
                                <a href="#">AFCL Schema 1.1</a></br>
                                <a href="#generaloverview">General overview</a></br>
                                <a href="#basefunction">Base function</a></br>
                                <a href="#compoundfunction">Compound function</a></br>
                                <a href="#sequence"><div class="sub-item">Sequence</div></a>
                                <a href="#parallel"><div class="sub-item">Parallel</div></a>
                                <a href="#conditionalCompound"><div class="sub-item">Conditional compound</div></a>
                                <a href="#ifthenelse"><div class="sub-sub-item">If-then-else</div></a>
                                <a href="#switch"><div class="sub-sub-item">Switch</div></a>
                                <a href="#sequentialLoop"><div class="sub-item">Sequential loop</div></a>
                                <a href="#for"><div class="sub-sub-item">For</div></a>
                                <a href="#while"><div class="sub-sub-item">While</div></a>
                                <a href="#parallelFor"><div class="sub-item">ParallelFor</div></a>
                                <a href="#workflowFileStructure">Workflow file structure</a></br>
                                <a href="#propandconst">Properties and Constraints</a></br>
                                <a href="#dataflow">Dataflow</a></br>
                                <a href="#element-index"><div class="sub-item">Element-index</div>
                                <a href="#distributionConstraints"><div class="sub-item">Distribution constraints</div></a>
                                <a href="#block"><div class="sub-sub-item">Block</div></a>
                                <a href="#replicate"><div class="sub-sub-item">Replicate</div></a>
                                <a href="#illegaldataflow"><div class="sub-item">Illegal dataflow</div>
                                <a href="#events">Events</a></br>
                                <a href="#invoketype">Invocation type</a></br>
                                <a href="#">Versions</a></br>
                                <a href="#"><div onclick="showV11()" style="color: red" class="sub-item"><b>1.1</b></div></a>
                                <a href="#"><div onclick="showV10()" class="sub-item">1.0</div></a>
                            </nav>
                        </div>
                    </div>
        <script type="application/javascript">
            function showV11() {
                document.getElementById("v10").style.display = "none";
                document.getElementById("v11").style.display = "block";
            }
            function showV10() {
                document.getElementById("v10").style.display = "block";
                document.getElementById("v11").style.display = "none";
            }
        </script>
</div>
<div class="content">
<h1>AFCL 1.1</h1>
<!--
    <div class="info">
        <strong>Updates!</strong>
        <ul>
            <li>"collection" is deprecated and will be removed. Replaced by "array" (from json). Supported
            types are now: json types and file.</li>
            <li>Element-index grammar is extended. It is now supported to define with e.g. 1::2 from index
            1 until the end of the list, with step 2.</li>
            <li>The dataOuts of an if can no longer have NULL object. It must be specified by another
            source field.</li>
            <li>A sub-condition in an if construct is extended with the type attribute in order to get the
            type of the data to compare.</li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
    </div>

    <div class="warning">
            <strong>Not clear!</strong>
            <ul>
                <li>What could be another loopCounter type e.g. in the for construct? What if type "string" is specified?
                What is "from" and what is "to"? Momentan muss number sein</li>
                <li>"saveto" in dataOuts specifies local file or external storage?</li>
                <li>parallelFor counter remove? As proposed by Fedor? We would need another field like iterator
                in the parallelConstruct to specify which collection to iterate.</li>
                <li>We should write somewhere that we exclude some characters in our syntax. E.g. a string cannot have "/",
                otherwise it is seen as source.</li>
                <li></li>
                <li></li>
            </ul>
        </div>
-->
    
    Will be added soon...</br>
</div>
`);