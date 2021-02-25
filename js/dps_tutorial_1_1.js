document.write(`
<div class="menu-and-content">
    <div class="menu">
        <div id="side-menu" class="side-menu">
            <nav id="doc-menu" class="nav doc-menu sticky">
                <a href="assets/dps_learn/schema/schema_1_1.json">AFCL Schema 1.1</a></br>
                <a href="#generaloverview1.1">General overview</a></br>
                <a href="#basefunction1.1">Base function</a></br>
                <a href="#compoundfunction1.1">Compound function</a></br>
                <a href="#sequenceAndParallel1.1"><div class="sub-item">Sequence/Parallel</div></a>
                <a href="#conditionalCompound1.1"><div class="sub-item">Conditional compound</div></a>
                <a href="#ifthenelse1.1"><div class="sub-sub-item">If-then-else</div></a>
                <a href="#switch1.1"><div class="sub-sub-item">Switch</div></a>
                <a href="#sequentialLoop1.1"><div class="sub-item">Sequential loop</div></a>
                <a href="#for1.1"><div class="sub-sub-item">For</div></a>
                <a href="#while1.1"><div class="sub-sub-item">While</div></a>
                <a href="#parallelFor1.1"><div class="sub-item">ParallelFor</div></a>
                <a href="#workflowFileStructure1.1">Workflow file structure</a></br>
                <a href="#specialCharacters1.1">Special characters</a></br>
                <a href="#propandconst1.1">Properties and Constraints</a></br>
                <a href="#dataflow1.1">Dataflow</a></br>
                <a href="#element-index1.1"><div class="sub-item">Element-index</div>
                <a href="#distributionConstraints1.1"><div class="sub-item">Distribution constraints</div></a>
                <a href="#block1.1"><div class="sub-sub-item">Block</div></a>
                <a href="#replicate1.1"><div class="sub-sub-item">Replicate</div></a>
                <a href="#split1.1"><div class="sub-sub-item">Split</div></a>
                <a href="#concatenation1.1"><div class="sub-item">Concatenation</div>
                <a href="#objectaccess1.1"><div class="sub-item">Object access</div>
                <a href="#illegaldataflow1.1"><div class="sub-item">Illegal dataflow</div>
                <!-- <a href="#events1.1">Events</a></br> -->
                <a href="#">Versions</a></br>
                <a href="#"><div onclick="showV11()" style="color: red" class="sub-item"><b>1.1</b></div></a>
                <a href="#"><div onclick="showV10()" class="sub-item">1.0</div></a>
            </nav>
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
        <div class="info">
            <h2>AFCL 1.1</h2>
            Due to the breaking changes introduced by the step from AFCL 1.0 to AFCL 1.1 certain adaptations are required w.r.t. the workflow description.
            <br/><br/><strong>Updates:</strong>
            <ul>
                <li>The <a class="highlight">collection</a> type is deprecated. Instead, the <a class="highlight">array</a> type
                of json will be used. Additionally, the <a class="highlight">file</a> type is removed in AFCL 1.1. Supported types
                are now: <i>json</i> types.</li>
                <li>The <a class="highlight">value</a> of a dataIns to represent a constant is no longer used. Instead the constant is simply expressed in the <a class="highlight">source</a> field.</li>
                <li>The <a class="highlight">sequence</a> and <a class="highlight">parallel</a> compounds have been removed from AFCL due to the fact that the 
                dependencies of functions are captured by the relation of their <a class="highlight">dataIns</a>/<a class="highlight">dataOuts</a>.</li>
                <li>The usage of <a class="highlight">block</a> and <a class="highlight">replicate</a> operators is no longer limited to the <a class="highlight">dataIns</a>
                of a <a class="highlight">parallelFor</a> compound.</li>
                <li>The <a class="highlight">split</a> operator is introduced to enable splitting an <a class="highlight">array</a>  into a given number of subarrays.</li>
                <li>The grammar of <a class="highlight">element-index</a> is extended.</li>
                <li>The operations <a class="highlight">block</a>, <a class="highlight">replicate</a>, <a class="highlight">split</a>, and <a class="highlight">element-index</a> can be concatenated arbitrarily.</li>
                <li>A way to <a class="reference" href="#objectaccess1.1">access parts of a json object</a> is introduced.</li>
                <li>The <a class="highlight">condition</a> construct of an <a class="highlight">if</a> and <a class="highlight">while</a> is modified in order to express more complex conditions.</li>
                <li>A <a class="highlight">type</a> field is added to the <a class="highlight">condition</a> construct.</li>
                <li>The <code class="w3-codespan inline">NULL</code> element in the <a class="highlight">dataOut</a> of a conditional compound is no longer supported.</li>
                <li>The <a class="highlight">loopCounter</a> element is removed for <a class="highlight">parallelFor</a> loops. Instead, a new field named <a class="highlight">iterator</a> is introduced.</li>
                <li>The built-in property <a class="highlight">invoke-type</a> is removed from AFCL.</li>
                <li>The <a class="highlight">saveto</a> field is removed from AFCL.</li>
            </ul>
        </div>

        <!--
        <div class="warning">
            <strong>Not clear!</strong>
            <ul>
                <li>What could be another loopCounter type e.g. in the for construct? What if type "string" is specified?
                What is "from" and what is "to"? Momentan muss number sein</li>
                <li>"saveto" in dataOuts specifies local file or external storage?</li>
                <li>parallelFor counter remove? As proposed by Fedor? We would need another field like iterator
                in the parallelConstruct to specify which array to iterate.</li>
                <li>We should write somewhere that we exclude some characters in our syntax. E.g. a string cannot have "/",
                otherwise it is seen as source.</li>
                <li>The dataOuts of an if can no longer have NULL object. It must be specified by another
                            source field.</li>
                <li>A sub-condition in an if construct is extended with the type attribute in order to get the
                            type of the data to compare.</li>
                <li></li>
            </ul>
        </div>
        -->

        <section id="generaloverview1.1">
    <h1>General overview</h1>
    AFCL is based on YAML which is a human-readable data
    serialization language. An AFCL Function Choreography (FC)
    consists of functions, which can be either <a class="reference" href="#basefunction1.1">base functions</a>
    or <a class="reference" href="#compoundfunction1.1">compound functions</a>. The former refers to a single computational
    task without further splitting it into smaller tasks, while
    the latter encloses some base functions or even nested compound
    functions. All base and compound functions can be connected
    by different control- and data-flow constructs. An FC is also a
    compound function. In order to create an FC, all its functions (base
    and compound) as well as control- and data-flow connections
    among them, must be specified. In order to facilitate optimized
    execution of FCs, a user optionally can specify <a class="reference" href="#propandconst1.1">properties and
    constraints</a> for functions and data-flow connections. In order to
    simplify the reading of AFCL specifications, we use a meta-syntax
    which extends YAML, such that YAML elements can be contained
    in <code class="w3-codespan inline">"{}"</code>
    and appended with wildcards <code class="w3-codespan inline">"?"</code> (0 or 1),
    <code class="w3-codespan inline">"*"</code> (0 or more),
    <code class="w3-codespan inline">"+"</code> (1 or more),
    and <code class="w3-codespan inline">"|"</code> (logical or).
</code></pre>
</section></br>
        <section id="basefunction1.1">
    <h1>Base function</h1>
    A base function represents a computational or data processing task.
    The <a class="highlight">name</a> of a function serves as a unique identifier. Functions are
    described by <a class="highlight">type</a> - Function Types (FTs) which are abstract descriptions
    of their corresponding function implementations (FIs).
    An FI represents an actual implementation of an FT. The FIs of the
    same function type are semantically equivalent, but may expose
    different performance or cost behavior or may be implemented
    with different programming languages, algorithms, etc. FTs shield
    implementation details from the FC developer. The selection of a
    specific FI for an FT is done by an underlying runtime system.
    <pre><code class="language-yaml">function: {
  name: "name",
  type: "type",
  dataIns: [
    {
      name: "name",
      type: "type",
      source: "source"
    }+
  ]?,
  dataOuts: [
    {
      name: "name",
      type: "type"
    }+
  ]?
}
</code></pre>
The input and output data of a function are specified through <a class="highlight">dataIns</a> and
<a class="highlight">dataOuts</a> ports of the function, respectively.
The <a class="highlight">name</a> and <a class="highlight">type</a> attributes of
the dataIns/Outs ports are uniquely determined by the chosen FT. A dataIns
port can be specified by
<ul>
    <li>setting its <a class="highlight">source</a> attributed to the name of a data
        port of another function within the same FC (dataIns from a parent compound
        function or dataOuts from a predecessor function) or the name of a dataIns
        port of the FC; or</li>
    <li>specifying a constant or an ordered list of constants.</li>
</ul>
Linking the data ports of different functions through the <a class="highlight">source</a>
attributes defines the data-flow of AFCL FCs. The source of a dataIns/Outs
port can be used as well to define constants. dataIns/Outs ports are optional as a
function may perform some predefined action in which case there is no need to
specify neither input nor output parameters.
Every dataIns/Outs port is associated with a data type. The data types
supported for AFCL are JSON datatypes: <i>string</i>, <i>number</i>, <i>boolean</i>, <i>null/empty</i>,
<i>object</i> and <i>array</i>.
The <i>string</i> type could be used to send a reference link (url) of a file located on an external storage.
</br></br>
<div class="info">
    <strong>Info!</strong>
    In the remainder we omit <a class="highlight">name</a>, <a class="highlight">type</a> and
    <a class="highlight">source</a> for simplicity. Instead, we will use only expressions like
    <code class="w3-codespan inline">dataIns[{}+]?</code>
    and <code class="w3-codespan inline">dataOuts[{}+]?</code>
    for the list of data inputs and outputs of a function.
    Additionally, we will use the abbreviation
    <code class="w3-codespan inline">function[{}+]</code> to specify a list of
    base or compound functions.
</div>

<h4>Example</h4>
The following example represents a base function defined in AFCL. The <a class="highlight">name</a> of
the function is <a class="highlight">addEmployee</a>, while the <a class="highlight">type</a> (Function Type)
of the function is <a class="highlight">addPersonToDataBase</a>. The function has six inputs (<a class="highlight">dataIns</a>):
<ul>
    <li>The first input, named <a class="highlight">fullName</a>, represents an input of type
        <a class="highlight">string</a>. The data of this input comes from a function named <a class="highlight">otherFunction</a>
        and its corresponding dataOuts named <a class="highlight">employeeName</a>.</li>
    <li>The second input represents the <a class="highlight">budget</a> of an employee, which is of type <a class="highlight">number</a>.
        The input does not come from a function, but is a default value of
        <a class="highlight">1000.0</a></li>
    <li>The input <a class="highlight">newcomer</a> is a <a class="highlight">boolean</a> which is <a class="highlight">true</a> by default.</li>
    <li>The <a class="highlight">address</a> of an employee is of type <a class="highlight">object</a>, which means that the input is a json object.
        The input comes from a function named <a class="highlight">otherFunction</a> and its corresponding output <a class="highlight">employeeAddress</a>. An example
        of such a json object could be: <code class="w3-codespan inline">{ "street_address": "Technikerstraße 21", "city": "Innsbruck", "state": "Austria" }</code>. Additionally, the <a class="highlight">object</a> type can be <a class="highlight">empty</a>
        (<code class="w3-codespan inline">{}</code>) or <a class="highlight">null</a> (<code class="w3-codespan inline">null</code>).</li>
    <li>The <a class="highlight">payments</a> input is of type <a class="highlight">object</a> and has the value <a class="highlight">null</a>.</li>
    <li>The input <a class="highlight">personalData</a> is of type <a class="highlight">array</a>. The corresponding array contains values of different types.</li>
</ul>
The function has two outputs:
<ul>
    <li>The first output, named <a class="highlight">outArray</a>, represents an output of type
        <a class="highlight">array</a>.
    <li>The second output, named <a class="highlight">success</a>, is of type
        <a class="highlight">boolean</a>.</li>
</ul>
<pre><code class="language-yaml">function: {
  name: "addEmployee",
  type: "addPersonToDataBase",
  dataIns: [
    { name: "fullName" , type: "string" , source: "otherFunction/employeeName" },
    { name: "budget" , type: "number" , source: 1000.0 },
    { name: "newcomer" , type: "boolean" , source: true },
    { name: "address" , type: "object" , source: "otherFunction/employeeAddress" },
    { name: "payments" , type: "object" , source: null },
    { name: "personalData" , type: "array" , source: [ 13 , "2U6D3" , { "gender" : "male" } ] }
  ],
  dataOuts: [
    { name: "outArray" ,  type: "array" },
    { name: "success" ,  type: "boolean" }
  ]
}
</code></pre>
                    </section></br>
        <section id="compoundfunction1.1">
                        <h1>Compound function</h1>
                        AFCL introduces a rich set of control-flow constructs (compound functions)
                        to simplify the specification of realistic FCs that are difficult to be composed
                        with any current FC system without support by a skilled software developer.
                        Compound functions contain inner functions, which can be base or compound
                        and they are executed in the order defined by the compound function. The
                        inner functions are called children functions of the compound function. The
                        compound function is called the parent function of the inner functions. An inner
                        function of a compound function can be another compound or base function.
                        The term child function refers to the entire compound function.
                        AFCL introduces the following compound functions:
                        <a class="reference" href="#sequenceAndParallel1.1">sequence,
                        parallel</a>,
                        <a class="reference" href="#ifthenelse1.1">if-then-else</a>,
                        <a class="reference" href="#switch1.1">switch</a>,
                        <a class="reference" href="#while1.1">while</a>,
                        <a class="reference" href="#for1.1">for</a>, and
                        <a class="reference" href="#parallelFor1.1">parallelFor</a>. 
                        The specifications for the
                        name attribute, dataIns and dataOuts ports, along with the corresponding
                        source attribute are similar as for a base function, while
                        the dataOuts port of a compound function is extended with the <a class="highlight">source</a> attribute.
                        </br></br><div class="info">
                        <strong>Info!</strong> In the remain
                        der of this text, we will not separately explain the attributes of a compound
                        function and when we use the term function, it can refer to either base function
                        or compound function.
                        </div>
                        <div id="sequenceAndParallel1.1">
                            <h2>Sequence and Parallel</h2>
                            A <a class="highlight">sequence</a> or <a class="highlight">parallel</a> section of base or
                            compount functions is implicitely expressed by the dataflow dependencies between the functions.
                            These dependencies of functions are captured by the relation of their dataIns/dataOuts.
                            
                            <h4>Example</h4>
                            Within this example the functions named <a class="highlight">f1</a> and <a class="highlight">f3</a> run 
                            in parallel. Both functions do not have any dependencies to other functions, and can 
                            therefore start immediately. After the termination of <a class="highlight">f1</a>, the function  <a class="highlight">f2</a>
                            will start, because <a class="highlight">f2</a> depends on the output of <a class="highlight">f1</a>. 
<pre><code class="language-yaml">[
  {
    function: {
      name: "f1",
      type: "f1Type",
      dataOuts: [
        { name: "outVal" ,  type: "number" },
      ]
    }
  },
  {
    function: {
      name: "f2",
      type: "f2Type",
      dataIns: [
        { name: "inVal" , type: "number" , source: "f1/outVal" },
      ]
    }
  },
  {
    function: {
      name: "f3",
      type: "f3Type"
    }
  }
]
</code></pre>
                            
                            
                        </div>
</br><div id="conditionalCompound1.1">
<h1>Conditional compound</h1>
A <a class="highlight">dataOuts</a> port of a conditional compound has a source value
with a comma separated list of dataOut ports of other functions.
This entry must contain one element for each possible branch
within the compound construct.

</div>
 </br><div id="ifthenelse1.1">
<h2>If-then-else</h2>
The if-then-else compound function is one of two conditional compound functions of AFCL.
The <a class="highlight">condition</a> attribute describes a set of subconditions. Each subcondition is combined to the next 
one with the <a class="highlight">combinedWith</a> attribute. A sub-condition
contains <a class="highlight">data1</a> and <a class="highlight">data2</a> of type <a class="highlight">type</a> which represent the data to be compared according
to the value of the <a class="highlight">operator</a> (
<code class="w3-codespan inline">==</code>,
<code class="w3-codespan inline"><</code>,
<code class="w3-codespan inline">></code>,
<code class="w3-codespan inline">≤</code>,
<code class="w3-codespan inline">≥</code> and
<code class="w3-codespan inline">!=</code>,
<code class="w3-codespan inline">contains</code>,
<code class="w3-codespan inline">startsWith</code>
and
<code class="w3-codespan inline">endsWith</code>) and optional <a class="highlight">negation</a>.
The operations are only allowed for specific datatypes.

<br/><br/>
<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;}
.tg td{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
  overflow:hidden;padding:10px 5px;word-break:normal;}
.tg th{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
  font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}
.tg .tg-kftd{background-color:#efefef;text-align:left;vertical-align:top}
.tg .tg-b3sw{background-color:#efefef;font-weight:bold;text-align:left;vertical-align:top}
.tg .tg-0lax{text-align:left;vertical-align:top}
</style>
<table class="tg" style="margin-left: auto; margin-right: auto;">
<thead>
  <tr>
    <th class="tg-kftd"></th>
    <th class="tg-b3sw">string</th>
    <th class="tg-b3sw">number</th>
    <th class="tg-b3sw">boolean</th>
    <th class="tg-b3sw">object</th>
    <th class="tg-b3sw">array</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-b3sw">==</td>
    <td class="tg-0lax">&#9989;</td>
    <td class="tg-0lax">&#9989;</td>
    <td class="tg-0lax">&#9989;</td>
    <td class="tg-0lax">&#9989;</td>
    <td class="tg-0lax">&#9989;</td>
  </tr>
  <tr>
    <td class="tg-b3sw">&lt;, &gt;, ≤, ≥</td>
    <td class="tg-0lax">&#9989;</td>
    <td class="tg-0lax">&#9989;</td>
    <td class="tg-0lax">&#9989;</td>
    <td class="tg-0lax">&#10060;</td>
    <td class="tg-0lax">&#9989;</td>
  </tr>
  <tr>
    <td class="tg-b3sw">!=</td>
    <td class="tg-0lax">&#9989;</td>
    <td class="tg-0lax">&#9989;</td>
    <td class="tg-0lax">&#9989;</td>
    <td class="tg-0lax">&#9989;</td>
    <td class="tg-0lax">&#9989;</td>
  </tr>
  <tr>
    <td class="tg-b3sw">contains</td>
    <td class="tg-0lax">&#9989;</td>
    <td class="tg-0lax">&#10060;</td>
    <td class="tg-0lax">&#10060;</td>
    <td class="tg-0lax">&#10060;</td>
    <td class="tg-0lax">&#9989;</td>
  </tr>
  <tr>
    <td class="tg-b3sw">startsWith</td>
    <td class="tg-0lax">&#9989;</td>
    <td class="tg-0lax">&#10060;</td>
    <td class="tg-0lax">&#10060;</td>
    <td class="tg-0lax">&#10060;</td>
    <td class="tg-0lax">&#10060;</td>
  </tr>
  <tr>
    <td class="tg-b3sw">endsWith</td>
    <td class="tg-0lax">&#9989;</td>
    <td class="tg-0lax">&#10060;</td>
    <td class="tg-0lax">&#10060;</td>
    <td class="tg-0lax">&#10060;</td>
    <td class="tg-0lax">&#10060;</td>
  </tr>
</tbody>
</table>
<br/>

The values of
data1 and data2 can be constants or the output from previous functions. If the condition is satisfied
then functions within the <a class="highlight">then</a> part are executed, otherwise the <a class="highlight">else</a> branch is
executed, if present.

<pre><code class="language-yaml">if: {
  name: "name",
  dataIns: [{}+]?,
  condition:
    [
        {
          data1: "data1",
          data2: "data2",
          type: "type",
          operator: "operator",
          negation: "negation",
          combinedWith: "and/or",
        }+
    ],
  then: [{function: {}}+],
  else: [{function: {}}+]?,
  dataOuts: [{}+]?
}
</code></pre>
<h4>Example</h4>
This example illustrates an if-then-else construct in AFCL. The construct has three inputs: <a class="highlight">sendNotification</a> which is of
type <a class="highlight">boolean</a>, <a class="highlight">employeeID</a> which is of type <a class="highlight">string</a> and <a class="highlight">defaultObject</a>
which is of type <a class="highlight">object</a>. All inputs come from other functions. The <a class="highlight">condition</a> within the construct checks whether the
input <a class="highlight">sendNotification</a> is equal to <a class="highlight">true</a>. In that case the  <a class="highlight">then</a> branch
will be executed and the function <a class="highlight">notifyEmployee</a> will be executed. The function has a <a class="highlight">sentTo</a> dataOuts
of type <a class="highlight">object</a>. The output of the whole if condition is named <a class="highlight">notificationSentTo</a> and of type
<a class="highlight">object</a>. The value after the if is either the value returned by the function <a class="highlight">notifyEmployee</a> or
the dataIns port <a class="highlight">defaultObject</a> of the compound, if the <a class="highlight">then</a> branch is not executed.
<pre><code class="language-yaml">if: {
  name: "sendNotificationOnSuccess",
  dataIns: [
    { name: "sendNotification" , type: "boolean" , source: "addEmployeeToDataBase/isEmployeeInDataBase" },
    { name: "employeeID" , type: "string" , source: "addEmployeeToDataBase/employeeID" },
    { name: "defaultObject" , type: "object" , source: "otherFunction/employee" }
  ],
  condition:
    [
      {
        data1: "sendNotificationOnSuccess/sendNotification",
        data2: true,
        type: "boolean",
        operator: "==",
        combinedWith: "and",
      }
    ],
  then: [
    {
      function: {
        name: "notifyEmployee",
        type: "notifier",
        dataIns: [
            { name: "employeeID" , type: "string" , source: "sendNotificationOnSuccess/employeeID" }
          ],
        dataOuts: [
            { name: "sentTo" , type: "object" }
        ]
      }
    }
  ],
dataOuts: [
    { name: "notificationSentTo" , type: "object" , source: "sendNotification/sentTo,sendNotificationOnSuccess/defaultObject" }
  ],
}
</code></pre>
</div>
    <div id="switch1.1" >
    <h2>Switch</h2>
    The switch compound function can be used to select a single
    <a class="highlight">case</a> or a <a class="highlight">default</a> compound function
    depending on the value of the <a class="highlight">dataEval</a>
    attribute, thereby acting as an XOR logical expression. In case <a class="highlight">break</a> is not
    used, then the switch compound function acts as an OR logical expression and
    multiple case branches might be selected.
    <pre><code class="language-yaml">switch: {
  name: "checkEmployeeID",
  dataIns: [{}+]?,
  dataEval:
    {
      name: "name",
      type: "type",
      source: "source"?
    },
  cases: [
    {
      value: "value",
      break: true | false,
      functions: [{function: {}}+]
    }+
  ],
  default: [{function: {}}+]?,
  dataOuts: [{}+]?
}
</code></pre>
<h4>Example</h4>
The following example shows a switch construct in AFCL. The construct has one input named <a class="highlight">employeeID</a> which is of type
<a class="highlight">string</a>. The <a class="highlight">dataEval</a> field represents the expression of the switch condition. It is of type
<a class="highlight">string</a> and it is specified by the input of the function. If the <a class="highlight">identifier</a> value equals to
<code class="w3-codespan inline">"MK13GHT2"</code>, the base function <a class="highlight">employeeCheck</a> is executed.
<pre><code class="language-yaml">switch: {
  name: "checkEmployeeID",
  dataIns: [
    { name: "employeeID" , type: "string" , source: "addEmployeeToDataBase/employeeID" }
  ],
  dataEval:
    {
      name: "identifier",
      type: "string",
      source: "checkEmployeeID/employeeID"
    },
  cases: [
    {
      value: "MK13GHT2",
      break: true,
      functions: [{function: {name: "employeeCheck" , type: "checker"}}]
    }
  ]
}
</code></pre>
</div>
<div id="sequentialLoop1.1" >
    <h1>Sequential Loop</h1>
Every <a class="highlight">for</a> and <a class="highlight">while</a> loop can optionally use <a class="highlight">dataLoop</a> ports
to represent inputs to functions specified in a
<a class="highlight">loopBody</a>. These ports get their initial value from the <a class="highlight">initSource</a> field, which is either a constant
or a source to another data port. A
<a class="highlight">loopSource</a> field specifies a data-flow from the output of a
function of the loop body which can be used as input to functions
executed in the next loop iteration. <a class="highlight">name</a> is an unique identifier
of a dataLoop port and type specifies the data type of the value.
</div>
    <div id="for1.1">
    <h2>For</h2>
    The for compound function executes its <a class="highlight">loopBody</a> multiple times
    based on the specified <a class="highlight">loopCounter</a>. The value of the loopCounter is initially
    set to the value specified by the attribute <a class="highlight">from</a> and is then increased by the
    value of <a class="highlight">step</a> until it reaches the value of <a class="highlight">to</a> or larger. The attributes from,
    to, and step can be specified with a constant value or with data ports of other
    functions. The loopCounter can be of <a class="highlight">type</a> number. To express 
    dependencies across loop iterations the <a class="highlight">dataLoop</a> ports
    are used.
    <pre><code class="language-yaml">for: {
  name: "name",
  dataIns: [{}+]?,
  dataLoops: [
    {
      name: "name",
      type: "type",
      initSource: "source",
      loopSource: "source",
    }+
  ]?,
  loopCounter:
    {
      name: "name",
      type: "type",
      from: "from",
      to: "to",
      step: "step",?
    },
  loopBody: [{function: {}}+],
  dataOuts: [{}+]?
}
</code></pre>
<h4>Example</h4>
The following example illstrates a for construct in AFCL. The loop iterates <code class="w3-codespan inline">10</code> times, as specified in the <a class="highlight">loopCounter</a>
field. The <a class="highlight">dataLoops</a> field illustrates the dependency between loop iterations. The inital value is set from the function
named <a class="highlight">otherFunction</a>. The value is updated in every loop iteration by the output value <a class="highlight">numObjects</a> of
<a class="highlight">getNumberObjects</a>. Additionally, the input to the function <a class="highlight">currentNumberObjects</a> is the output of the
previous iteration of the function.
<pre><code class="language-yaml">for: {
  name: "sumUp",
  dataLoops: [
    {
      name: "sum",
      type: "number",
      initSource: "otherFunction/initValue",
      loopSource: "getNumberObjects/numObjects"
    }
  ],
  loopCounter: { name: "counter" , type: "number" , from: 0 , to: 10 },
  loopBody: [
    {
    function: {
        name: "getNumberObjects",
        type: "objectRecognition",
        dataIns: [
            { name: "imagePath" , type: "string" , source: "https://external.storage.com/images" },
            { name: "curentNumberObjects" , type: "number" , source: "sumUp/sum" }
          ],
        dataOuts: [
            { name: "numObjects" , type: "number" }
        ]
      }
    }
  ],
  dataOuts: [
    { name: "totalObjects" , type: "number" , source: "sumUp/sum" }
  ],
}
</code></pre>
</div>
<div id="while1.1">
    <h2>While</h2>
    The while compound function is used to execute a <a class="highlight">loopBody</a> zero
    or more times, depending on the specified <a class="highlight">condition</a>. The condition has the
    same structure as in the <a class="reference" href="#ifthenelse1.1">if-then-else</a> compound.
    The loopBody will be executed until the specified condition evaluates to <code class="w3-codespan inline">false</code>.
    Similarly as in the <a class="reference" href="#for1.1">for</a> compound function, dependencies across loop iterations
    in while can be expressed with <a class="highlight">dataLoop</a> ports.
    <pre><code class="language-yaml">while: {
  name: "name",
  dataIns: [{}+]?,
  dataLoops: [
    {
      name: "name",
      type: "type",
      initSource: "source",
      loopSource: "source",
    }+
  ]?,
  condition: [{}+],
  loopBody: [{function: {}}+],
  dataOuts: [{}+]?
}
</code></pre>
<h4>Example</h4>
The following example shows the while construct in AFCL. WIthin this example one iteration passes a value to the next iteration, specified with the
<a class="highlight">dataLoops</a> field. The initial value of the <a class="highlight">continue</a> variable of type <a class="highlight">boolean</a>
is given by the function <a class="highlight">otherFunction</a>. The value is updated after every loop iteration according to the value of <a class="highlight">continueLoop</a>
of the <a class="highlight">checkEmployees</a> function. The loop body will be executed until the value of <a class="highlight">employeesInBuilding</a> is false as
specified in the <a class="highlight">condition</a> field.
<pre><code class="language-yaml">while: {
  name: "recognizeObjects",
  dataLoops: [
    {
      name: "continue",
      type: "boolean",
      initSource: "otherFunction/shouldStart",
      loopSource: "checkEmployees/employeesInBuilding",
    }
  ],
  condition:
      [ { data1: "recognizeObjects/continue" , data2: true , operator: "==",  type: "boolean", combinedWith: "and" } ],
  loopBody: [
    function: {
        name: "checkEmployees",
        type: "detectEmployees",
        dataOuts: [
            { name: "employeesInBuilding" , type: "boolean" }
        ]
      }
  ]
}
</code></pre>
    </div>
                        </br></br><div id="parallelFor1.1">
                        <h2>ParallelFor</h2>
                        The parallelFor compound function expresses the simultaneous
                        execution of all loop iterations. It is assumed that there are no data dependencies
                        across loop iterations. Instead of the <a class="highlight">loopCounter</a>, the distribution of given
                        arrays across multiple parallel executions of the same function is specified via the <a class="highlight">iterators</a>
                        entry. The value of iterators is a list containing either 
                        <ul>
                            <li>(a) the names of one or multiple dataIns of the parallelFor compound or</li>
                            <li>(b) a single integer (possibly specified via the corresponding dataOut of a
                            function preceding the parallelFor).</li>
                        </ul>
                        In case (a), the dataIns specified in the iterators list must be of type array. In case of multiple entries, the arrays
                        must have the same size. In this case, the content of the parallelFor compound will be executed once for each
                        element of the iterator arrays. In each parallel execution, any function that specified an iterator
                        dataIn as its dataIn will be supplied with exactly one element of the array.<br/>
                        Case (b): In cases where the iterators entry is a single integer (e.g., 5), the contents of the parallelFor compound
                        will be executed for this number of times with the same input. An example usage would be a MonteCarlo simulation 
                        which is to be executed for a given number of times.<br/>
                        In both cases (a) and (b), the dataOuts of the parallelFor pointing to a dataOut of any function from
                        within the parallelFor body is created as an array of the outputs of the functions executed in
                        parallel.
                        
                        <pre><code class="language-yaml">parallelFor: {
  name: "name",
  dataIns: [{}+]?,
  iterators: [iterators],
  loopBody: [{function: {}}+],
  dataOuts: [{}+]?
}
</code></pre>
<h4>Examples</h4>
The following examples show the usage of a parallelFor in AFCL.
<pre><code class="language-yaml">parallelFor: {
  name: "exampleParallelFor",
  dataIns: [
    { name: "dataIn1", type: "number", source: 3 },
    { name: "dataIn2", type: "array", source: [1,2,3,4] },
    { name: "dataIn3", type: "array", source: ["a", "b", "c", "d"] }
  ],
  iterators: [Q], # Q is a variable - see below
  loopBody: [
    {
      function: {
        name: "executedInParallel", type: "exampleType2",
        dataIns: [
          {
            name: "parDataIn1", type: X, # X is a variable - see below
            source: "exampleParallelFor/dataIn1"
          },
          {
            name: "parDataIn2", type: Y, # Y is a variable - see below
            source: "exampleParallelFor/dataIn2"
          },
          {
            name: "parDatIn3", type: Z, # Z is a variable - see below
            source: "exampleParallelFor/dataIn3"
          },
        ],
        dataOuts: [ { name: "otherIntResult", type: "number" } ]
     }
   }
  ],
  dataOuts: [
    {
      name: "parForResult", type: "array",
      source: "executedInParallel/otherIntResult"
    }
  ]
}</code></pre>
<ul>
    <li><a class="highlight">Iterating over a single array</a>
    <pre><code class="language-json">Q = "dataIns2"
X = number
Y = number
Z = array</code></pre>
    Specifying the name of an array dataIn (in this case, "dataIn2") leads to <code class="w3-codespan inline">n</code> parallel executions, 
    with <code class="w3-codespan inline">n</code> being the
    number of the elements in the array (4 in this case).
    <br/><br/><a class="highlight">Inputs</a>: The four parallel iterations of the "executedInParallel" function will get the following inputs:
    <ul>
        <li>Iteration 0:</li>
        <ul>
            <li>"parDataIn1" : <code class="w3-codespan inline">3</code></li>
            <li>"parDataIn2" : <code class="w3-codespan inline">1</code></li>
            <li>"parDataIn3" : <code class="w3-codespan inline">["a","b","c","d"]</code></li>
        </ul>
        <li>Iteration 1:</li>
        <ul>
            <li>"parDataIn1" : <code class="w3-codespan inline">3</code></li>
            <li>"parDataIn2" : <code class="w3-codespan inline">2</code></li>
            <li>"parDataIn3" : <code class="w3-codespan inline">["a","b","c","d"]</code></li>
        </ul>
        <li>Iteration 2:</li>
        <ul>
            <li>"parDataIn1" : <code class="w3-codespan inline">3</code></li>
            <li>"parDataIn2" : <code class="w3-codespan inline">3</code></li>
            <li>"parDataIn3" : <code class="w3-codespan inline">["a","b","c","d"]</code></li>
        </ul>
        <li>Iteration 3:</li>
        <ul>
            <li>"parDataIn1" : <code class="w3-codespan inline">3</code></li>
            <li>"parDataIn2" : <code class="w3-codespan inline">4</code></li>
            <li>"parDataIn3" : <code class="w3-codespan inline">["a","b","c","d"]</code></li>
        </ul>
    </ul>
    <a class="highlight">Output</a>: Assuming that Res(n) denotes the result of the n-th iteration (with the inputs as specified above) of the
    "executedInParallel" function, the output (accessible as the dataOut of the parallelFor compound vie the source
    "exampleParallelFor/parForResult") will be a array with the content [Res(0), Res(1), Res(2), Res(3)].
    </li>
    <br/><li><a class="highlight">Iterating over multiple arrays</a>
    <pre><code class="language-json">Q = "dataIns2", "dataIns3"
X = number
Y = number
Z = string</code></pre>
    Specifying the name of multiple array sataIns (in this case, "dataIn2" "and dataIn3") leads to <code class="w3-codespan inline">n</code> parallel
    executions, with <code class="w3-codespan inline">n</code> being the number of the elements in each array (4 in this case - an exception is thrown
    in cases where the provided arrays have different size).
    <br/><br/><a class="highlight">Inputs</a>: The four parallel iterations of the "executedInParallel" function will get the following inputs:
    <ul>
        <li>Iteration 0:</li>
        <ul>
            <li>"parDataIn1" : <code class="w3-codespan inline">3</code></li>
            <li>"parDataIn2" : <code class="w3-codespan inline">1</code></li>
            <li>"parDataIn3" : <code class="w3-codespan inline">"a"</code></li>
        </ul>
        <li>Iteration 1:</li>
        <ul>
            <li>"parDataIn1" : <code class="w3-codespan inline">3</code></li>
            <li>"parDataIn2" : <code class="w3-codespan inline">2</code></li>
            <li>"parDataIn3" : <code class="w3-codespan inline">"b"</code></li>
        </ul>
        <li>Iteration 2:</li>
        <ul>
            <li>"parDataIn1" : <code class="w3-codespan inline">3</code></li>
            <li>"parDataIn2" : <code class="w3-codespan inline">3</code></li>
            <li>"parDataIn3" : <code class="w3-codespan inline">"c"</code></li>
        </ul>
        <li>Iteration 3:</li>
        <ul>
            <li>"parDataIn1" : <code class="w3-codespan inline">3</code></li>
            <li>"parDataIn2" : <code class="w3-codespan inline">4</code></li>
            <li>"parDataIn3" : <code class="w3-codespan inline">"d"</code></li>
        </ul>
    </ul>
    <a class="highlight">Output</a>: Assuming that Res(n) denotes the result of the n-th iteration (with the inputs as specified above) of
    the "executedInParallel" function, the output (accessible as the dataOut of the parallelFor compound vie the
    source "exampleParallelFor/parForResult") will be a array with the content [Res(0), Res(1), Res(2),
    Res(3)].
    </li>
    <br/><li><a class="highlight">Given Number of parallel iterations</a>
    <pre><code class="language-json">Q = "dataIns1"
X = number
Y = array
Z = array</code></pre>
    Specifying an integer <code class="w3-codespan inline">n</code> - possibly by the source of the dataOut producing an integer or an integer dataIn of
    the parallelFor compound - as the single (!) entry of the "iterators" list results in the parallel execution of <code class="w3-codespan inline">n</code>
    iterations of the parallelFor body, each with the input specified by their dataIns:
    <br/><br/><a class="highlight">Inputs</a>: The three parallel iterations of the "executedInParallel" function will get the following inputs:
    <ul>
        <li>Iteration 0:</li>
        <ul>
            <li>"parDataIn1" : <code class="w3-codespan inline">3</code></li>
            <li>"parDataIn2" : <code class="w3-codespan inline">[1,2,3,4]</code></li>
            <li>"parDataIn3" : <code class="w3-codespan inline">["a","b","c","d"]</code></li>
        </ul>
        <li>Iteration 1:</li>
        <ul>
            <li>"parDataIn1" : <code class="w3-codespan inline">3</code></li>
            <li>"parDataIn2" : <code class="w3-codespan inline">[1,2,3,4]</code></li>
            <li>"parDataIn3" : <code class="w3-codespan inline">["a","b","c","d"]</code></li>
        </ul>
        <li>Iteration 2:</li>
        <ul>
            <li>"parDataIn1" : <code class="w3-codespan inline">3</code></li>
            <li>"parDataIn2" : <code class="w3-codespan inline">[1,2,3,4]</code></li>
            <li>"parDataIn3" : <code class="w3-codespan inline">["a","b","c","d"]</code></li>
        </ul>
    </ul>
    <a class="highlight">Output</a>: Assuming that Res(n) denotes the result of the n-th iteration (with the inputs as specified above) of
    the "executedInParallel" function, the output (accessible as the DataOut of the parallelFor compound vie the
    source "exampleParallelFor/parForResult") will be a array with the content [Res(0), Res(1), Res(2)].
    </li>
    <br/><li><a class="highlight">Iterating over a modified array</a><br/>
    By specifying one (or multiple concatenated) operations for the modification of arrays (block, replicate,
    split, and element-index), in the dataIn of the parallelFor compound, it is possible to modify an array
    before it is used as an iterator. For example, the application of a block(2,1) operation to the array
    arrayResult1 is specified by adding the corresponding constraint to the corresponding dataIn of the
    parallelFor compound:
    <pre><code class="language-yaml"># same as in example above
{
  name: "dataIn2", type: "array",
  source: "exampleFunction/arrayResult1",
  constraints: [ { name: "block", value: "2,1" } ]
}
# same as in example above</code></pre>
    <pre><code class="language-json">Q = "dataIns2"
X = number
Y = array
Z = array</code></pre>
    <br/><a class="highlight">Inputs</a>:  The three parallel iterations of the "executedInParallel" function will get the following inputs:
    <ul>
        <li>Iteration 0:</li>
        <ul>
            <li>"parDataIn1" : <code class="w3-codespan inline">3</code></li>
            <li>"parDataIn2" : <code class="w3-codespan inline">[1,2]</code></li>
            <li>"parDataIn3" : <code class="w3-codespan inline">["a","b","c","d"]</code></li>
        </ul>
        <li>Iteration 1:</li>
        <ul>
            <li>"parDataIn1" : <code class="w3-codespan inline">3</code></li>
            <li>"parDataIn2" : <code class="w3-codespan inline">[2,3]</code></li>
            <li>"parDataIn3" : <code class="w3-codespan inline">["a","b","c","d"]</code></li>
        </ul>
        <li>Iteration 2:</li>
        <ul>
            <li>"parDataIn1" : <code class="w3-codespan inline">3</code></li>
            <li>"parDataIn2" : <code class="w3-codespan inline">[3,4]</code></li>
            <li>"parDataIn3" : <code class="w3-codespan inline">["a","b","c","d"]</code></li>
        </ul>
    </ul>
    <a class="highlight">Output</a>: Assuming that Res(n) denotes the result of the n-th iteration (with the inputs as specified above) of
    the "executedInParallel" function, the output (accessible as the dataOut of the parallelFor compound vie the
    source "exampleParallelFor/parForResult") will be a array with the content [Res(0), Res(1), Res(2)].
    </li>
</ul>
                    </div>
                    </section>
        <section id="workflowFileStructure1.1">
<h1>Workflow file structure</h1>
The final structure of an AFCL <code class="w3-codespan inline">.yaml</code> file looks as follows:
    <pre><code class="language-yaml">{
 name: "name",
 dataIns: [{}+]?,
 workflowBody: [{function: {}}+],
 dataOuts: [{}+]?
}
</code></pre>
</section>
        <section id="specialCharacters1.1">
<h1>Special characters</h1>
AFCL introduces several characters with special meaning:
<ul>
    <li>The <i>backslash</i> character (<code class="w3-codespan inline">"/"</code>) is used to specify the entry of the <a class="highlight">source</a> field.</li>
    <li>The <i>comma</i> symbol (<code class="w3-codespan inline">","</code>) is used to express a list of possible outputs specify in the <a class="highlight">source</a> field.</li>
</ul>

These characters should only be used if their actual purpose is intended. E.g. the function <a class="highlight">name</a> field should not contain any of these characters.
</section>
        <section id="propandconst1.1">
                        <h1>Properties and Constraints</h1>
                        Properties and constraints are optional attributes, which
                        provide additional information about <a class="highlight">dataIn</a> ports, <a class="highlight">dataOut</a>
                        ports, and base and compound functions.
                        Properties can be used to describe hints about the behavior
                        of functions, e.g. expected size of input data or memory required 
                        for execution. Constraints (e.g. finish execution time
                        within a time limit, data distributions, fault tolerance settings)
                        should be fulfilled by the runtime system on a best-effort basis.
                        AFCL introduces built-in constraint (<a class="reference" href="#dataflow1.1">dataflow</a>) to
                        specify how data is gathered from or distributed among multiple
                        functions, and built-in constraint element-index
                        to specify a subset of a data array.
                        <pre><code class="language-yaml">function: {
  name: "name",
  type: "type",
  dataIns: [
    {
      name: "name" , type: "type" , source: "source" , 
      properties: [{ name: "name" , value: "value" }+]?,
      constraints: [{ name: "name" , value: "value" }+]?
    }+
  ]?,
  properties: [{ name: "name" , value: "value" }+]?,
  constraints: [{ name: "name" , value: "value" }+]?,
  dataOuts: [
    {
      name: "name" , type: "type"
      properties: [{ name: "name" , value: "value" }+]?,
      constraints: [{ name: "name" , value: "value" }+]?
    }+
  ]?
}
</code></pre>
                    </section></br>
        <section id="dataflow1.1">
                        <h1>Dataflow</h1>
                        Most FC systems offer basic support to express data-flow
within an FC, primarily by storing outputs of functions to a
variable which can be used as input to other FC functions. AFCL
supports various constructs to express more complex data-flow
scenarios, which can also improve the performance of the resulting FC. The data-flow in AFCL is expressed by connecting source
data ports to sink data ports of functions. A source data port can
be an input data port for the entire FC, for a compound function,
or for an output data port of a base function. A sink data port can
be an output data port of the entire FC, an output data port of
a compound function, or an input data port of a base function.
When a source data port is connected to a sink data port dataflow, the data produced at the source data port will be available
at the sink data port at runtime when the data is to be consumed.
One source data port may have multiple sink data ports, in which
case each sink data port will receive a copy of the data produced
at the source data port.</br></br>
AFCL allows the application developer to describe how data
flows from dataOut ports of one or multiple functions into a
single dataIn port of subsequent functions. Since AFCL supports
nesting of compound functions, we also support data-flow from
dataIn ports of a parent compound function to the dataIn ports
of inner functions. For every function in AFCL, it must be guaranteed that whenever the control-flow reaches the function, all the
dataIn ports of the function have been assigned well defined
values. When the control-flow leaves a function that is invoked
synchronously, all its dataOut ports must be well-defined, as
well. Otherwise, for a function that is invoked asynchronously,
the developer is responsible to synchronize data. For functions
with basic control-flow, this is straightforward. In the following
sections, we describe more complex data-flow scenarios.
</br></br>
    Many real world FCs may operate on datasets instead of on
    single data elements. Furthermore, there are numerous cases
    where it makes sense to collect data elements from the output
    of a set of functions and include them in a array (e.g. a
    consumer of message queues or stream-processing tools) for
    further processing by subsequent functions. Arrays are also
    well suited to exploit data parallelism by distributing array
    data elements to loop iterations or parallel sections. Arrays
    may contain a static or dynamic number (unknown at the time
    when an FC is composed but not yet executed) of data elements.
    In order to support this feature as part of AFCL, we introduce the
    concept of a data array . The elements of a data collec-
    tion are of JSON datatypes and they can be distributed onto base
    and compound functions. The data port with type array
    represents a list of data elements provided by the user as the ini-
    tial input of an FC or produced by FC functions as an intermediate
    result
    <div id="element-index1.1">
<h2>ELEMENT_INDEX</h2>
Subsets of data arrays can be specified by using the build-in
constraint <a class="highlight">element-index</a>. With
<a class="highlight">index</a>, the user can specify certain positions of
the data array.

<ul>
    <li><a class="highlight">Input:</a> an array.</li>
    <li><a class="highlight">Output:</a> an array or an element of the array.</li>
    <li><a class="highlight">Parameters:</a></li>
    <ul>
        <li><a class="highlight">index:</a> the value of the element-index.</li>
    </ul>
</ul>

<pre><code class="language-yaml">constraits: [
    { name: "element-index" , value: "<span>&#60;</span>index<span>&#62;</span>" }
]
</code></pre>
The value of element-index is a list of
comma separated expressions. Note that in the absence of the
type element-index, the entire data array is specified.
The syntax of the element-index constraint is based on the 
<a class="reference" href="https://docs.python.org/3/tutorial/introduction.html#lists">"list slicing" in Python</a>.
The following grammar specifies the syntax of the construct
element-index, where <code class="w3-codespan inline">e</code> denotes the element index, <code class="w3-codespan inline">c</code> a colon
expression, <code class="w3-codespan inline">s1</code> the start index, <code class="w3-codespan inline">s2</code> the end index,
and <code class="w3-codespan inline">s3</code> a stride.
</br>
<code class="w3-codespan inline">e ::= c [, c ]∗</code>
</br>
<code class="w3-codespan inline">c ::= s1 [: [s2] [: [s3] ]]</code>
</br>
Such an expression can refer to either a specific index or a
range of indexes with an optional stride.
</br></br>
<h4>Examples</h4>
<ul>
    <li>
        <code class="w3-codespan inline">1,2:6:2</code>:
        </br>
        <pre><code class="language-yaml">dataIns: [
  {
    name: "elementIndexDataIn" , type: "array" ,
    source: [0,1,2,3,4,5,6,7],
    constraints: [ { name: "element-index", value: "1,2:6:2" } ]
  }
]</code></pre>
        <img style="width: 70%" src="assets/dps_learn/figures/element-index.png" alt="element-index"><br/>
        <a class="highlight">Result</a>: <code class="w3-codespan inline">[1,2,4,6]</code>
    </li><br/>
    <li>
        <code class="w3-codespan inline">2</code>:
        </br>
        <pre><code class="language-yaml">dataIns: [
  {
    name: "elementIndexDataIn" , type: "array" ,
    source: [0,1,2,3,4,5,6],
    constraints: [ { name: "element-index", value: "2" } ]
  }
]</code></pre>
        <a class="highlight">Result</a>: <code class="w3-codespan inline">2</code> of type <a class="highlight">number</a>.
    </li>
</ul>
</div>
                    </section>
        <section id="distributionConstraints1.1">
                        <h1>Distribution constraints</h1>
Most existing FC systems mainly replicate collected data to
multiple functions or loop iterations without supporting the concept
of data distributions. This inefficient data transfer between
functions may initiate a considerable delay in function invocation
time. AFCL offers additional, build-in, distribution constraints,
which allow the developer to specify how data elements of a array
will be distributed across successor functions. AFCL introduces the follwing
distribution constraints: <a class="highlight">block</a>, 
<a class="highlight">replicate</a> and <a class="highlight">split</a>.
 <div id="block1.1">
<h2>BLOCK</h2>
Using the built-in constraint <a class="highlight">block</a> and specifying the block-based data distribution,
i.e. <a class="highlight">size</a> and optional <a class="highlight">overlap</a>,
a data array is partitioned in contiguous blocks of a specific
length. 
<ul>
    <li><a class="highlight">Input:</a> an array.</li>
    <li><a class="highlight">Output:</a> an array, where each element is itself an array.</li>
    <li><a class="highlight">Parameters:</a></li>
    <ul>
        <li><a class="highlight">size:</a> (integer bigger than 1) The number of the elements of the input array which are summarized to
        one element of the output array. Note that, depending on the chosen size parameter and the size of
        the processed array, there can be cases where the last element of the output array will contain
        less than size elements (see examples below).</li>
        <li><a class="highlight">overlap:</a> : (non-negative integer) The number of shared elements between two subsequent elements of the
        output array.</li>
    </ul>
</ul>

<pre><code class="language-yaml">constraits: [
    { name: "block" , value: "<span>&#60;</span>size<span>&#62;</span>, <span>&#60;</span>overlap<span>&#62;</span>" }
]
</code></pre>
<h4>Examples</h4>
<ul>
    <li>
        <code class="w3-codespan inline">4,2</code>:
        </br>
        <pre><code class="language-yaml">dataIns: [
  {
    name: "blockDataIn" , type: "array" ,
    source: [0,1,2,3,4,5,6,7],
    constraints: [ { name: "block", value: "4,2" } ]
  }
]</code></pre>
        <img style="width: 70%" src="assets/dps_learn/figures/block.png" alt="Italian Trulli"><br/>
        <a class="highlight">Result</a>: <code class="w3-codespan inline">[[0,1,2,3],[2,3,4,5],[4,5,6,7]]</code>
    </li><br/>
    <li>
        <code class="w3-codespan inline">2,0</code>:
        </br>
        <pre><code class="language-yaml">dataIns: [
  {
    name: "blockDataIn" , type: "array" ,
    source: [0,1,2,3,4,5,6],
    constraints: [ { name: "block", value: "2,0" } ]
  }
]</code></pre>
        <a class="highlight">Result</a>: <code class="w3-codespan inline">[[0,1],[2,3],[4,5],[6]]</code>. The last 
        entry of the output array contains less than 2 elements, since it is not possible to include it in a 
        entry with 2 elements, while respecting both the size and the overlap.
    </li>
</ul>
<div id="replicate1.1">
<h2>REPLICATE</h2>
Another option is to replicate a certain
dataOuts port and then distribute to the different successor
functions. AFCL allows data replication by specifying the constraint
<a class="highlight">replicate</a> in combination with the number of replications (<a class="highlight">times</a>).

<ul>
    <li><a class="highlight">Input:</a> (a) a single element or (b) an array of elements.</li>
    <li><a class="highlight">Output:</a> an array created by replicating, i.e., creating additional copies of (a) the single given element or
    (b) each element of the provided array.</li>
    <li><a class="highlight">Parameters:</a></li>
    <ul>
        <li><a class="highlight">times:</a>  (integer bigger than 1) The number of times that each element of the input array
        (or the single input element) have to be replicated to create the output array.</li>
    </ul>
</ul>

<pre><code class="language-yaml">constraits: [
    { name: "replicate" , value: "<span>&#60;</span>times<span>&#62;</span>" }
]
</code></pre>
The elements of a data array will be replicated a specific number
of times.
<!--The dataIn and dataOut ports of each construct can be of type array in order to collect the data
produced by a loop iteration, a parallel section or any other function.
After all loop iterations finished, all dataOuts are written
into the dataOuts of the parallelFor, parallel, while and
for construct, which is of type array and can be accessed
by subsequent functions.-->
</br></br>
<h4>Examples</h4>
<ul>
    <li>
        <code class="w3-codespan inline">2</code>:
        </br>
        <pre><code class="language-yaml">dataIns: [
  {
    name: "replicateDataIn" , type: "array" ,
    source: [0,1,2,3],
    constraints: [ { name: "replicate", value: "2" } ]
  }
]</code></pre>
        <img style="width: 70%" src="assets/dps_learn/figures/replicate.png" alt="Italian Trulli"><br/>
        <a class="highlight">Result</a>: <code class="w3-codespan inline">[0,0,1,1,2,2,3,3]</code>
    </li><br/>
    <li>
        <code class="w3-codespan inline">5</code>:
        </br>
        <pre><code class="language-yaml">dataIns: [
  {
    name: "replicateDataIn" , type: "number" ,
    source: 3,
    constraints: [ { name: "replicate", value: "5" } ]
  }
]</code></pre>
        <a class="highlight">Result</a>: <code class="w3-codespan inline">[3,3,3,3,3]</code>
    </li><br/>
</ul>
</div>
 <div id="split1.1">
<h2>SPLIT</h2>
The split operation enables to split an array into a given number of subarrays.

<ul>
    <li><a class="highlight">Input:</a> an array.</li>
    <li><a class="highlight">Output:</a> an array, where each element is a subarray of the input array (splitting an array in 2
    results in an array with 2 elements, each containing one half of the entries of the input array, see
    examples below).</li>
    <li><a class="highlight">Parameters:</a></li>
    <ul>
        <li><a class="highlight">split-number:</a> (integer bigger than 1) The number of parts that the input array is to be split into. Each
        element - potentially with the exception of the last one - of the output array will contain <code class="w3-codespan inline">n</code> elements,
        with <code class="w3-codespan inline">n=&#8968;I/s&#8969;</code>( <code class="w3-codespan inline">I</code> : size of the input array, 
        <code class="w3-codespan inline">s</code> : split number). Each element of the output array
        contains at least one element of the input array. In cases where the provided split number is larger than
        the size of the input array, the output array will be identical to the input (see examples below).</li>
    </ul>
</ul>

<pre><code class="language-yaml">constraits: [
    { name: "split" , value: "<span>&#60;</span>split-number<span>&#62;</span>" }
]
</code></pre>
<h4>Examples</h4>
<ul>
    <li>
        <code class="w3-codespan inline">2</code>:
        </br>
        <pre><code class="language-yaml">dataIns: [
  {
    name: "replicateDataIn" , type: "array" ,
    source: [0,1,2,3,4,5,6,7],
    constraints: [ { name: "split", value: "2" } ]
  }
]</code></pre>
        <img style="width: 70%" src="assets/dps_learn/figures/split.png" alt="Italian Trullis"><br/>
        <a class="highlight">Result</a>: <code class="w3-codespan inline">[[0,1,2,3],[4,5,6,7]]</code>
    </li><br/>
    <li>
        <code class="w3-codespan inline">2</code>:
        </br>
        <pre><code class="language-yaml">dataIns: [
  {
    name: "replicateDataIn" , type: "array" ,
    source: [0,1,2,3,4,5,6],
    constraints: [ { name: "split", value: "2" } ]
  }
]</code></pre>
        <a class="highlight">Result</a>: <code class="w3-codespan inline">[[0,1,2,3],[4,5,6]]</code> (uneven split).
    </li><br/>
    <li>
        <code class="w3-codespan inline">3</code>:
        </br>
        <pre><code class="language-yaml">dataIns: [
  {
    name: "replicateDataIn" , type: "array" ,
    source: [0,1,2,3,4,5,6],
    constraints: [ { name: "split", value: "3" } ]
  }
]</code></pre>
        <a class="highlight">Result</a>: <code class="w3-codespan inline">[[0,1,2],[3,4,5],[6]]</code> (uneven split).
    </li><br/>
    <li>
        <code class="w3-codespan inline">8</code>:
        </br>
        <pre><code class="language-yaml">dataIns: [
  {
    name: "replicateDataIn" , type: "array" ,
    source: [0,1,2,3,4,5,6],
    constraints: [ { name: "split", value: "8" } ]
  }
]</code></pre>
        <a class="highlight">Result</a>: <code class="w3-codespan inline">[[0],[1],[2],[3],[4],[5],[6]]</code> (split number too large).
    </li><br/>
</ul>
</div>
                        <!--<h4>Example</h4>
The following example shows the usage of <a class="highlight">block</a>, <a class="highlight">replicate</a> and
<a class="highlight">element-index</a> in a parallelFor.
<ul>
    <li>The first input to the parallelFor is of type <a class="highlight">number</a>, coming from another function. This input is used to
        determine the number of parallel loop iterations specified in the <a class="highlight">loopCounter</a>'s <a class="highlight">to</a>
        attribute.</li>
    <li>The second input of type <a class="highlight">array</a>, which is distributed across the loop iterations with
        <code class="w3-codespan inline">block(1)</code>. This specification means that each iteration gets one element of the array. Let
        us assume the array looks as follows: <code class="w3-codespan inline">[0, 1, 2, 3]</code>. Each iteration would get one element of
        the array, e.g. the first iteration gets <code class="w3-codespan inline">0</code> which is of type <a class="highlight">number</a> as specified in
        the first input (<a class="highlight">employeeID</a>) of the function <a class="highlight">assignEmployee</a>.</li>
    <li>The third input is again of type <a class="highlight">array</a>. Let us assume the array looks as follows:
        <code class="w3-codespan inline">["1S3DF2", "7G3UU8"]</code>. The <a class="highlight">distribution</a> specified
        within this input is <code class="w3-codespan inline">replicate(2)</code>, meaning that the first two iterations get
        <code class="w3-codespan inline">"1S3DF2"</code> which is of type <a class="highlight">string</a> (as specified in the
        <a class="highlight">employeeStatus</a> input of the <a class="highlight">assignEmployee</a> function). The third and fourth
        iteration of the loop get <code class="w3-codespan inline">"7G3UU8"</code>.</li>
    <li>The fourth input will be distributed across the iterations using <code class="w3-codespan inline">block(4,2)</code>. Let
        us assume the array looks as follows: <code class="w3-codespan inline">[0, 1, 2, 3, 4, 5, 6, 7]</code>. Then, the
        first iteration would get <code class="w3-codespan inline">[0, 1, 2, 3]</code>, the second would get
        <code class="w3-codespan inline">[2, 3, 4, 5]</code>, etc. All of them are of type <a class="highlight">array</a>.</li>
    <li>The fifth and last input uses the <code class="w3-codespan inline">element-index</code> constraint. Let us assume we
        have the following array: <code class="w3-codespan inline">[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]</code>. Specifying
        <code class="w3-codespan inline">element-index</code> as index would result in the following array:
        <code class="w3-codespan inline">[1, 2, 4, 6, 8, 10]</code>, which is the same for all iterations in the parallelFor.</li>
</ul>
<pre><code class="language-yaml">parallelFor: {
   name: "iterateAllEmployees",
   dataIns: [
     { name: "totalEmployees" , type: "number" , source: "otherFunction/numEmployees" },
     { name: "employeeIds" , type: "array" , source: "otherFunction/employeeIds" ,
       constraints: [{ name: "block" , value: "1" }] },
     { name: "employeeStatus" , type: "array" , source: "otherFunction/status" ,
       constraints: [{ name: "replicate" , value: "2" }] },
     { name: "taskList1" , type: "array" , source: "otherFunction/tasks" ,
       constraints: [{ name: "block" , value: "4,2" }] },
     { name: "taskList2" , type: "array" , source: "anotherFunction/tasks" ,
        constraints: [{ name: "element-index" , value: "1,2:10:2" }] }
   ],
   loopCounter:
     { name: "iterator" , type: "number" , from: "0" , to: "loopName/totalEmployees" },
   loopBody: [
     function: {
       name: "assignEmployee",
       type: "assignEmployeeToTasks",
       dataIns: [
         { name: "employeeID" , type: "number" , source: "iterateAllEmployees/employeeIds" },
         { name: "employeeStatus" , type: "string" , source: "iterateAllEmployees/employeeStatus" },
         { name: "tasks1" , type: "array" , source: "iterateAllEmployees/taskList1" },
         { name: "tasks2" , type: "array" , source: "iterateAllEmployees/taskList2" }
       ]
     }
   ]
 }
</code></pre>-->
            <div class="info">
                <strong>Info!</strong>
                The usage of block, replicate, split and element-index is not limited to the dataIns
                of the parallelFor compound, but can instead be applied on any dataIn referring to (a) an
                array in case of block, split and element-index
                or (b) an array or an element in case of replicate.
            </div>
</section>
        <section id="concatenation1.1">
        <h1>Concatenating Multiple Operations</h1>
        The dataIn operations element-index, block, replicate and split can be concatenated by annotating multiple of these
        operations in the constraints entry of the dataIn. It is also possible to apply the same operation, e.g., element-index,
        multiple times. The operations are then applied in the same order as they are specified in the constraints entry of
        the dataIn.<br/>
        Note that, during the formulation of a concatenation of these operations, it is, for each pair of subsequently applied
        operations, necessary to ensure the correct relation of the output of the first operation to the input of the second
        operation. For instance, in the example below, applying the element-index before the split operation could result in
        a run-time error in cases where the result of the element index operation is a single element and not an array.
        <ul>
            <li><a class="highlight">Input:</a> same as the input of the dataIn operation which is specified first.</li>
            <li><a class="highlight">Output:</a> same as the output of the dataIn operation which is specified last.</li>
            <li><a class="highlight">Parameters:</a></li>
            <ul>
                <li>Each dataIn operation is annotated with the same parameters as in cases without concatenation.</li>        
            </ul>
        </ul>
        <h4>Example</h4>
        <pre><code class="language-yaml">dataIns: [
  {
    name: "concatenationDataIn" , type: "array" ,
    source: [0,1,2,3,4,5,6],
    constraints: [ 
      { name: "split", value: "3" },
      { name: "element-index", value: "0" } 
    ]
  }
]</code></pre>
        <a class="highlight">Result</a>: <code class="w3-codespan inline">[0,1,2]</code> (In this case, the concatenation is used to obtain the first third of the array)).
        </section>
        <section id="objectaccess1.1">
            <h1>Object access</h1>
            AFCL introduces a way to access only parts of a json-object. In order to do so, the user accesses sub-objects via the
            <code class="w3-codespan inline">/</code> special character. It is necessary that the user knows the structure of the json-object.
            <h4>Example</h4>
            Let us assume that the function <a class="highlight">getEmployee</a> has the following json <a class="highlight">object</a> as output,
            named <a class="highlight">employee</a>:
            <pre><code class="language-json">{
    "employee": {
        "employeeID": "AH6FT8Z",
        "address": {
            "street": "Technikerstraße 21",
            "city": "Innsbruck",
            "state": "Austria"
        }
    }
}</code></pre>
The function <a class="highlight">checkState</a> needs as input only part of the json object from the function
<a class="highlight">getEmployee</a>. The reference to the corresponding part of the object is expressed as
<code class="w3-codespan inline">getEmployee/employee/address/state</code> in the <a class="highlight">source</a>
attribute of the <a class="highlight">checkState</a> input. The function  <a class="highlight">checkEmployee</a>
needs again the whole object from <a class="highlight">getEmployee</a> as input.
<pre><code class="language-yaml">sequence: {
  name: "addEmployeeToDataBase",
  sequenceBody: [
    {
      function: {
        name: "getEmployee",
        type: "returnEmployee",
        dataOuts: [ { name: "employee" ,  type: "object" } ]
      }
    },
    {
      function: {
        name: "checkState",
        type: "checkEmployeeState",
        dataIns: [ { name: "state" , type: "string" , source: "getEmployee/employee/address/state" } ],
        dataOuts: [ { name: "status" ,  type: "boolean" } ]
      }
    },
    {
      function: {
        name: "checkEmployee",
        type: "compareWithDatabase",
        dataIns: [
         { name: "employeeID" , type: "boolean" , source: "checkState/status" },
         { name: "employee" , type: "object" , source: "getEmployee/employee" }
        ]
      }
    }
  ]
}
</code></pre>
        </section>
        <section id="illegaldataflow1.1">
                                            <h1>Illegal dataflow</h1>
 AFCL allows a developer to set the source of dataIns port
of a function to the dataOut of a data port of any other function.
The following figure shows such data-flow from function <code class="w3-codespan inline">f1</code> to function
<code class="w3-codespan inline">f4</code>. However, data-flow is challenging for conditional compound
functions where not all control-flow branches are executed at runtime. Therefore, we have to prevent that a successor function
<code class="w3-codespan inline">f4</code>, outside
of a conditional compound function, reads data from dataOuts
of any inner function <code class="w3-codespan inline">f2</code> or <code class="w3-codespan inline">f3</code> as one of these functions may
never execute. In order to prevent this illegal case, any outside
successor function can only read data from dataOuts of the
whole conditional compound, which will always be defined. A
dataOuts port of a conditional compound has a source value
with a comma separated list of dataOut ports of other functions.
This entry must contain one element for each possible branch
within the compound construct. <br/>
<img style="display: block; width: 40%; margin-left: auto; margin-right: auto;" src="assets/dps_learn/figures/illegaldataflow.JPG" alt="illegal dataflow">
<div class="info">
    <strong>Info!</strong>
    The dataIn from a function inside a compound can access data from a predecessor function outside of that compound. A function after a compund cannot access data from a function inside of that compound.
    It is necessary to access the data via the dataOuts of the compound. A function can therefore only access data from
    another function with the same or higher hierarchy.
</div>
                                        </section>
<!--        <section id="events1.1">
                        <h1>Event-based invocation</h1>
                        Events in AFCL are specified in a separate YAML file. By
                        keeping events in a separate file, a user can execute the same
                        FC based on different events or multiple FCs based on the same
                        event. The <a class="highlight">start</a>
                        and <a class="highlight">end</a> fields represent the period of time when the event
                        is active, which means that the FC will be invoked only if an
                        active event happens. If the start date is not specified, the event is
                        active immediately, while the event is active until it is removed
                        if the end is not specified. The type of an event could be <code class="w3-codespan inline">ONCE</code> ,
                        <code class="w3-codespan inline">PERIODIC</code> (run an FC periodically after a specific period of time),
                        or external events, such as <code class="w3-codespan inline">STREAM_DATA</code> (run the FC for every
                        data item coming out of a data stream), <code class="w3-codespan inline">NEW_FILE</code> (run the FC
                        whenever a new file is added to a storage e.g. S3 bucket) or
                        <code class="w3-codespan inline">NEW_DATABASE_ENTRY</code> (run the FC whenever there is a new
                        entry in a specified database). The value is represented in each
                        case as a string, which expresses e.g. a cron for the <code class="w3-codespan inline">PERIODIC</code>
                        invocation.
                        <pre><code class="language-yaml">events: [
    {
        start: "dd-MM-yyyy HH:mm:ss",?
        end: "dd-MM-yyyy HH:mm:ss",?
        type: "type",
        value: "value"
    }
]
</code></pre>
<h4>Example</h4>
Starting from the 1st of February 2021, the FC is invoked every hour until the 3rd of February, 2021.
<pre><code class="language-yaml">events: [
    {
        start: "01-02-2021 00:00:00",
        end: "03-02-2021 00:00:00",
        type: "PERIODIC",
        value: "0 * * * *"
    }
]
</code></pre>
                    </section>-->
    </div>
</div>
`);
