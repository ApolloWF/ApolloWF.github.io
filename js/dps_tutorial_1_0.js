document.write(`
<div class="menu-and-content">
                    <div class="menu">
                        <div id="side-menu" class="side-menu">
                            <nav id="doc-menu" class="nav doc-menu sticky">
                                <a href="assets/dps_learn/schema/schema_1_0.json" download>AFCL Schema 1.0</a></br>
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
                                <a href="#specialCharacters">Special characters</a></br>
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
                                <a href="#"><div onclick="showV11()" class="sub-item">1.1</div></a>
                                <a href="#"><div onclick="showV10()" style="color: red" class="sub-item"><b>1.0</b></div></a>
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
<div class="content">
<div class="info">
    <h2>AFCL 1.0</h2>
    <!--You are looking at AFCL version <b>1.0</b>. There is a newer version available.-->
</div>
<section id="generaloverview">
    <h1>General overview</h1>
    AFCL is based on YAML which is a human-readable data
    serialization language. An AFCL Function Choreography (FC)
    consists of functions, which can be either <a class="reference" href="#basefunction">base functions</a>
    or <a class="reference" href="#compoundfunction">compound functions</a>. The former refers to a single computational
    task without further splitting it into smaller tasks, while
    the latter encloses some base functions or even nested compound
    functions. All base and compound functions can be connected
    by different control- and data-flow constructs. An FC is also a
    compound function. In order to create an FC, all its functions (base
    and compound) as well as control- and data-flow connections
    among them, must be specified. In order to facilitate optimized
    execution of FCs, a user optionally can specify <a class="reference" href="#propandconst">properties and
    constraints</a> for functions and data-flow connections. In order to
    simplify the reading of AFCL specifications, we use meta-syntax
    which extends YAML, such that YAML elements can be contained
    in <code class="w3-codespan inline">"{}"</code>
    and appended with wildcards <code class="w3-codespan inline">"?"</code> (0 or 1),
    <code class="w3-codespan inline">"*"</code> (0 or more),
    <code class="w3-codespan inline">"+"</code> (1 or more),
    and <code class="w3-codespan inline">"|"</code> (logical or).
</code></pre>
</section></br>
<section id="basefunction">
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
      source: "source" | value: "value"
    }+
  ]?,
  dataOuts: [
    {
      name: "name",
      type: "type",
      saveto: "saveto"?
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
        port of the FC;</li>
    <li>setting its <a class="highlight">source</a> attribute to a specific URL referring to
        a file, or an ordered list of URLs referring to an ordered list of files; or</li>
    <li>specifying a constant or an ordered list of constants.</li>
</ul>
The data associated with the dataOuts port can be stored in the
location specified through its <a class="highlight">saveto</a>
attribute. Linking the data ports of different functions through the <a class="highlight">source</a>
attributes defines the data-flow of AFCL FCs. The <a class="highlight">value</a> of a dataIns/Outs
port can be used to define a constant. dataIns/Outs ports are optional as a
function may perform some predefined action in which case there is no need to
specify neither input nor output parameters.
Every dataIns/Outs port is associated with a data type. The data types
supported for AFCL are JSON datatypes: <i>string</i>, <i>number</i>, <i>boolean</i>, <i>null/empty</i>,
<i>object</i> and <i>array</i>, as well as two additional types, <i>file</i> and <i>collection</i>.
The <i>string</i> type could be used to send a reference link (url) of a file located on an external storage.
</br></br>
<div class="info">
    <strong>Info!</strong>
    In the remainder we omit <a class="highlight">name</a>, <a class="highlight">type</a>, <a class="highlight">source</a>, <a class="highlight">value</a>, and
    <a class="highlight">saveto</a> for simplicity. Instead, we will use only expressions
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
of the function is <a class="highlight">addPersonToDataBase</a>. The function has seven inputs (<a class="highlight">dataIns</a>):
<ul>
    <li>The first input, named <a class="highlight">fullName</a>, represents an input of type
        <a class="highlight">string</a>. The data of this input comes from a function named <a class="highlight">otherFunction</a>
        and its corresponding dataOuts named <a class="highlight">out1</a>.</li>
    <li>The second input represents the <a class="highlight">budget</a> of an employee, which is of type <a class="highlight">number</a>.
        The input does not come from a function, but is a default <a class="highlight">value</a> of
        <a class="highlight">1000.0</a></li>
    <li>The input <a class="highlight">newcomer</a> is a <a class="highlight">boolean</a> which is <a class="highlight">true</a> by default.</li>
    <li>The <a class="highlight">address</a> of an employee is of type <a class="highlight">object</a>, which means that the input is a json object.
        The input comes from a function named <a class="highlight">otherFunction</a> and its corresponding output <a class="highlight">out2</a>. An example
        of such a json object could be: <code class="w3-codespan inline">{ "street_address": "Technikerstraße 21", "city": "Innsbruck", "state": "Austria" }</code>. Additionally, the <a class="highlight">object</a> type can be <a class="highlight">empty</a>
        (<code class="w3-codespan inline">{}</code>) or <a class="highlight">null</a> (<code class="w3-codespan inline">null</code>).</li>
    <li>The <a class="highlight">payments</a> input is of type <a class="highlight">object</a> and has the value <a class="highlight">null</a>.</li>
    <li>The input <a class="highlight">personalData</a> is of type <a class="highlight">array</a>. The corresponding array contains values of different types.</li>
    <li>The <a class="highlight">curriculum</a> input is of type <a class="highlight">file</a>. The file could be an output of another function or directly accessible within the environment.
    The <a class="highlight">source</a> of a file type is a string pointing to the actual file.</li>
</ul>
The function has two outputs:
<ul>
    <li>The first output, named <a class="highlight">outCollection</a>, represents an output of type
        <a class="highlight">collection</a>. The collection type is explained further  <a class="reference" href="#dataflow">here</a>.</li>
    <li>The second output, named <a class="highlight">success</a>, is of type
        <a class="highlight">boolean</a>. This output is stored to the file specified in the <a class="highlight">saveto</a> field.</li>
</ul>
<pre><code class="language-yaml">function: {
  name: "addEmployee",
  type: "addPersonToDataBase",
  dataIns: [
    { name: "fullName" , type: "string" , source: "otherFunction/out1" },
    { name: "budget" , type: "number" , value: 1000.0 },
    { name: "newcomer" , type: "boolean" , value: true },
    { name: "address" , type: "object" , source: "otherFunction/out2" },
    { name: "payments" , type: "object" , value: null },
    { name: "personalData" , type: "array" , value: [ 13 , "2U6D3" , { "gender" : "male" } ] },
    { name: "curriculum" , type: "file" , source: "path/to/curriculum.xml" }
  ],
  dataOuts: [
    { name: "outCollection" ,  type: "collection" },
    { name: "success" ,  type: "boolean" , saveto: "https://some.storage/output.json" }
  ]
}
</code></pre>
                    </section></br>
                    <section id="compoundfunction">
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
                        <a class="reference" href="#sequence">sequence</a>,
                        <a class="reference" href="#parallel">parallel</a>,
                        <a class="reference" href="#ifthenelse">if-then-else</a>,
                        <a class="reference" href="#switch">switch</a>,
                        <a class="reference" href="#while">while</a>,
                        <a class="reference" href="#for">for</a>, and
                        <a class="reference" href="#parallelFor">parallelFor</a>.
                        The specifications for the
                        name attribute, dataIns and dataOuts ports, along with the corresponding
                        source and saveto attributes are similar as for a base function, while
                        the dataOuts port of a compound function is extended with the source attribute.
                        </br></br><div class="info">
                        <strong>Info!</strong> In the remain
                        der of this text, we will not separately explain the attributes of a compound
                        function and when we use the term function, it can refer to either base function
                        or compound function.
                        </div>
                        <div id="sequence">
                            <h2>Sequence</h2>
                            The sequence compound function represents a sequential controlflow of all inner
                            functions within the <a class="highlight">sequenceBody</a> section.
                            AFCL introduces <a class="highlight">source</a> attribute for <a class="highlight">dataOuts</a> ports for each compound
                            function in order to specify internal data-flow from dataOuts ports of children
                            functions to dataOuts ports of the parent compound function. The value of
                            the source attribute is similar to that of the source attribute of a dataIns
                            port, except that it refers to dataOut ports of children functions of a compound
                            function.
                            <pre><code class="language-yaml">sequence: {
  name: "name",
  dataIns: [{}+]?,
  sequenceBody: [
    {
      function: {}
    }+
  ],
  dataOuts: [
    {
      name: "name",
      type: "type",
      source: "source",
      saveto: "saveto"?
    }+
  ]?
}
</code></pre>
</br><div class="info">
    <strong>Info!</strong>
    In order to simplify
    AFCL, we assume that all base or compounds functions, which are specified
    one after the other, are sequential without specifying them into a sequence
    compound function.
    </div>
<h4>Example</h4>
This example illustrates a sequence of two functions: <a class="highlight">addEmployee</a> and <a class="highlight">checkAddedEmployee</a>. The sequnce
construct is named <a class="highlight">addEmployeeToDataBase</a> and does not have any input. The first function that is executed within
a sequence is  <a class="highlight">addEmployee</a>. This function does not have any input, but as output an <a class="highlight">employeeID</a>
of type <a class="highlight">string</a>. This output is input to the next function (<a class="highlight">checkAddedEmployee</a>), referenced
via the <a class="highlight">source</a> attribute. The output of the whole sequence is the output of the <a class="highlight">checkAddedEmployee</a> function named
<a class="highlight">success</a>. Another output is the <a class="highlight">employeeID</a> from the previous function.
<pre><code class="language-yaml">sequence: {
  name: "addEmployeeToDataBase",
  sequenceBody: [
    {
      function: {
        name: "addEmployee",
        type: "addPersonToDataBase",
        dataOuts: [
          { name: "employeeID" ,  type: "string" }
        ]
      }
    },
    {
      function: {
        name: "checkAddedEmployee",
        type: "readPersonFromDataBase",
        dataIns: [
          { name: "employeeID" , type: "string" , source: "addEmployee/employeeID" }
        ],
        dataOuts: [
          { name: "success" ,  type: "boolean" }
        ]
      }
    }
  ],
  dataOuts: [
    { name: "isEmployeeInDataBase" , type: "boolean" , source: "checkAddedEmployee/success" },
    { name: "employeeID" , type: "string" , source: "addEmployee/employeeID" }
  ]
}
</code></pre>
                        </div>
</br></br><div id="parallel" >
        <h2>Parallel</h2>
        The parallel compound function expresses the parallel execution
        of a set of sections. Each <a class="highlight">section</a> within the <a class="highlight">parallelBody</a> represents a list of
        base or a compound functions, which can run in parallel with other sections. The
        parallel compound function can have arbitrary many data input ports (<a class="highlight">dataIns</a>), whose
        associated data can be distributed among inner functions.
        <pre><code class="language-yaml">parallel: {
  name: "name",
  dataIns: [{}+]?,
  parallelBody: [
    {
      section: [{function: {}}+]
    }+
  ],
  dataOuts: [{}+]?
}
</code></pre>
<h4>Example</h4>
The following example shows two functions running in parallel (<a class="highlight">informEmployee</a> and <a class="highlight">logEmployeeData</a>).
The <a class="highlight">parallelBody</a> contains two <a class="highlight">section</a>s. Both of them contain one base function. The output
of the parallel construct is the output <a class="highlight">success</a> of the function <a class="highlight">informEmployee</a>.
<pre><code class="language-yaml">parallel: {
  name: "notifyAndInform",
  dataIns: [
    { name: "employeeID" , type: "string" , source: "otherFunction/out1" }
  ],
  parallelBody: [
    {
      section: [ {
        function: {
            name: "informEmployee",
            type: "notifyEmployee",
            dataIns: [ { name: "employeeID" , type: "string" , source: "notifyAndInform/employeeID" } ],
            dataOuts: [ { name: "success" , type: "boolean" } ]
        }
      } ]
    },
    {
      section: [ {
        function: {
            name: "logEmployeeData",
            type: "logData",
            dataIns: [ { name: "employeeID" , type: "string" , source: "notifyAndInform/employeeID" } ]
        }
      } ]
    }
  ],
  dataOuts: [ { name: "success" , type: "boolean" ,  source: "informEmployee/success"} ]
}
</code></pre>
                    </div>
</br><div id="conditionalCompound">
<h1>Conditional compound</h1>
A <a class="highlight">dataOuts</a> port of a conditional compound has a source value
with a comma separated list of dataOut ports of other functions.
This entry must contain one element for each possible branch
within the compound construct. In addition, if no <a class="highlight">else</a> branch,
or no <a class="highlight">default</a> case is defined, the list must also contain a <code class="w3-codespan inline">NULL</code>
element, which indicates that no data is available in that case.

</div>
 </br><div id="ifthenelse">
<h2>If-then-else</h2>
The if-then-else compound function is one of two conditional compound functions of AFCL.
The <a class="highlight">condition</a> attribute describes a set of subconditions combined with the
<a class="highlight">combinedWith</a> attribute. A sub-condition
contains <a class="highlight">data1</a> and <a class="highlight">data2</a> which represent the data to be compared according
to the value of the <a class="highlight">operator</a> (
<code class="w3-codespan inline">==</code>,
<code class="w3-codespan inline"><</code>,
<code class="w3-codespan inline">></code>,
<code class="w3-codespan inline">≤</code>,
<code class="w3-codespan inline">≥</code> and
<code class="w3-codespan inline">!=</code>,
<code class="w3-codespan inline">contains</code>,
<code class="w3-codespan inline"></code>
and
<code class="w3-codespan inline">endsWith</code>) and optionally <a class="highlight">negation</a>. The values of
data1 and data2 can be constants or the output from previous functions. If the condition is satisfied
then functions within the <a class="highlight">then</a> part are executed, otherwise the <a class="highlight">else</a> branch is
executed.

<pre><code class="language-yaml">if: {
  name: "name",
  dataIns: [{}+]?,
  condition:
    {
      combinedWith: "and/or",
      conditions: [
        {
          data1: "data1",
          data2: "1",
          operator: "operator",
          negation: "negation",
        }+
      ]
    },
  then: [{function: {}}+],
  else: [{function: {}}+]?,
  dataOuts: [{}+]?
}
</code></pre>
<h4>Example</h4>
This example illustrates an if-then-else construct in AFCL. The construct has two inputs: <a class="highlight">sendNotification</a> which is of
type <a class="highlight">boolean</a> and <a class="highlight">employeeID</a> which is of type <a class="highlight">string</a>. Both inputs come from another
function named <a class="highlight">addEmployeeToDataBase</a>. The <a class="highlight">condition</a> within the construct checks whether the
input <a class="highlight">sendNotification</a> is equal to <a class="highlight">true</a>. In that case the  <a class="highlight">then</a> branch
will be executed and the function <a class="highlight">notifyEmployee</a> will be executed. The function has a <a class="highlight">sentTo</a> dataOus
of type <a class="highlight">object</a>. The output of the whole if condition is named <a class="highlight">notificationSentTo</a> and of type
<a class="highlight">object</a>. The value after the if is either the value returned by the function <a class="highlight">notifyEmployee</a> or
<code class="w3-codespan inline">NULL</code> if the <a class="highlight">then</a> branch is not executed.
<pre><code class="language-yaml">if: {
  name: "sendNotificationOnSuccess",
  dataIns: [
    { name: "sendNotification" , type: "boolean" , source: "addEmployeeToDataBase/isEmployeeInDataBase" },
    { name: "employeeID" , type: "string" , source: "addEmployeeToDataBase/employeeID" }
  ],
  condition:
    {
      combinedWith: "and",
      conditions: [
        {
          data1: "sendNotificationOnSuccess/sendNotification",
          data2: "true",
          operator: "=="
        }
      ]
    },
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
    { name: "notificationSentTo" , type: "object" , source: "sendNotification/sentTo,NULL" }
  ],
}
</code></pre>
<div class="info">
    <strong>Note!</strong> In order to express an advanced condition (combination of conditions with <code class="w3-codespan inline">and</code>
     and <code class="w3-codespan inline">or</code>) create multiple if constructs and nest them. Example: to express
     <code class="w3-codespan inline">(a==0 or b==1) and c==3</code> create two if constructs with the following conditions:
  <pre><code class="language-yaml">if: {
    name: "advancedConditionPart1",
    condition:
      {
        combinedWith: "or",
        conditions: [ { data1: "a" , data2: "0" , operator: "==" , },
           { data1: "b" , data2: "1" , operator: "==" , } ]
      },
    then: [
      {
        if: {
            name: "advancedConditionPart2",
            condition:
              {
                combinedWith: "and",
                conditions: [ { data1: "c" , data2: "3" , operator: "==" , } ]
              },
            then: [{function: {}}+],
          }
      }
    ]
  }
  </code></pre>
</div>
</div>
    <div id="switch" >
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
      break: "true",
      functions: [{function: {}}+]
    }+
  ],
  default: [{function: {}}+]?,
  dataOuts: [{}+]?
}
</code></pre>
<h4>Example</h4>
The following example shows an switch construct in AFCL. The construct has one input named <a class="highlight">employeeID</a> which is of type
<a class="highlight">string</a>. The <a class="highlight">dataEval</a> field represents the expression of the switch condition. It is of type
<a class="highlight">string</a> and is specified by the input of the function. If the <a class="highlight">identifier</a> value equals to
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
      break: "true",
      functions: [{function: {name: "employeeCheck" , type: "checker"}}]
    }
  ]
}
</code></pre>
</div>
<div id="sequentialLoop" >
    <h1>Sequential Loop</h1>
Every <a class="highlight">for</a> and <a class="highlight">while</a> loop can optionally use <a class="highlight">dataLoop</a> ports
to represent inputs to functions specified in a
<a class="highlight">loopBody</a>. These ports get their initial value from the optional
<a class="highlight">initSource</a> field or a constant value from the <a class="highlight">value</a> field. A
<a class="highlight">loopSource</a> field specifies a data-flow from the output of a
function of the loop body which can be used as input to functions
executed in the next loop iteration. <a class="highlight">name</a> is an unique identifier
of a DataLoop port and type specifies the data type of the value.
</div>
    <div id="for">
    <h2>For</h2>
    The for compound function executes its <a class="highlight">loopBody</a> multiple times
    based on the specified <a class="highlight">loopCounter</a>. The value of the loopCounter is initially
    set to the value specified by the attribute <a class="highlight">from</a> and is then increased by the
    value of <a class="highlight">step</a> until it reaches the value of <a class="highlight">to</a> or larger. The attributes from,
    to, and step can be specified with a constant <a class="highlight">value</a> or with data ports of other
    functions. To express dependencies across loop iterations the <a class="highlight">dataLoop</a> ports
    are used. These ports get their initial value from the optional <a class="highlight">initSource</a> field or a constant
    value from the <a class="highlight">value</a> field. A <a class="highlight">loopSource</a> field specifies a data-flow from the
    output of a function of the loop body which can be used as input to functions
    executed in the next loop iteration. <a class="highlight">name</a> is an unique identifier of a DataLoop
    port and <a class="highlight">type</a> specifies the data type of the value.
    <pre><code class="language-yaml">for: {
  name: "name",
  dataIns: [{}+]?,
  dataLoops: [
    {
      name: "name",
      type: "type",
      initSource: "source"?,
      loopSource: "source",
      value: "constant"?
    }+
  ]?,
  loopCounter:
    {
      name: "name",
      type: "type",
      from: "from",
      to: "to",
      step: "step"?,
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
  loopCounter: { name: "counter" , type: "number" , from: "0" , to: "10" },
  loopBody: [
    {
    function: {
        name: "getNumberObjects",
        type: "objectRecognition",
        dataIns: [
            { name: "imagePath" , type: "string" , value: "https://external.storage.com/images" },
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
<div id="while">
    <h2>While</h2>
    The while compound function is used to execute a <a class="highlight">loopBody</a> zero
    or more times, depending on the specified <a class="highlight">condition</a>. The condition has the
    same structure as in the <a class="reference" href="#ifthenelse">if-then-else</a> compound.
    The loopBody will be executed until the specified condition evaluates to <code class="w3-codespan inline">false</code>.
    Similarly as in the <a class="reference" href="#for">for</a> compound function, dependencies across loop iterations
    in while can be expressed with <a class="highlight">dataLoop</a> ports.
    <pre><code class="language-yaml">while: {
  name: "name",
  dataIns: [{}+]?,
  dataLoops: [
    {
      name: "name",
      type: "type",
      initSource: "source"?,
      loopSource: "source",
      value: "constant"?
    }+
  ]?,
  condition:
    {
      combinedWith: "and/or",
      conditions: [{}+]
    },
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
      {
        combinedWith: "and",
        conditions: [ { data1: "recognizeObjects/continue" , data2: "true" , operator: "==" } ]
      },
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
                        </br></br><div id="parallelFor">
                        <h2>ParallelFor</h2>
                        The parallelFor compound function expresses the simultaneous
                        execution of all loop iterations. It is assumed that there are no data dependencies
                        across loop iterations. All other elements of the constructs behave the same
                        as in the <a class="reference" href="#for">for</a> compound function.
                        <pre><code class="language-yaml">parallelFor: {
  name: "name",
  dataIns: [{}+]?,
  loopCounter:
    {
      name: "name" , type: "type" , from: "from" , to: "to" , step: "step"?
    },
  loopBody: [{function: {}}+],
  dataOuts: [{}+]?
}
</code></pre>
<h4>Example</h4>
The following example shows an example of the parallelFor construct. As specified in the <a class="highlight">loopCounter</a> field,
the number of parallel iterations of the function <a class="highlight">assignEmployee</a> is specified by another function named
<a class="highlight">otherFunction</a>.
<pre><code class="language-yaml">parallelFor: {
   name: "iterateAllEmployees",
   loopCounter: {  name: "iterator" , type: "number" , from: "0" , to: "otherFunction/totalEmployees" },
   loopBody: [
     function: {
       name: "assignEmployee",
       type: "assignEmployeeToWork",
     }
   ]
 }
</code></pre>
                    </div>
                    </section>
<section id="workflowFileStructure">
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
<section id="specialCharacters">
<h1>Special characters</h1>
AFCL introduces several characters with special meaning:
<ul>
    <li>The <i>backslash</i> character (<code class="w3-codespan inline">"/"</code>) is used to specify the entry of the <a class="highlight">source</a> field.</li>
    <li>The <i>comma</i> symbol (<code class="w3-codespan inline">","</code>) is used to express a list of possible outputs specify in the <a class="highlight">source</a> field.</li>
</ul>

These characters should only be used if their actual purpose is intended. E.g. the function <a class="highlight">name</a> field should not contain any of these characters.
</section>
                    <section id="propandconst">
                        <h1>Properties and Constraints</h1>
                        Properties and constraints are optional attributes, which
                        provide additional information about <a class="highlight">dataIn</a> ports, <a class="highlight">dataOut</a>
                        ports, and base and compound functions.
                        Properties can be used to describe hints about the behavior
                        of functions, e.g. expected size of input data or memory re-
                        quired for execution. Constraints (e.g. finish execution time
                        within a time limit, data distributions, fault tolerance settings)
                        should be fulfilled by the runtime system on a best-effort basis.
                        AFCL introduces built-in property <a class="reference" href="#invoketype">invoke-type</a> to specify
                        whether a function should be invoked synchronously or asyn-
                        chronously, built-in constraint (<a class="reference" href="#dataflow">dataflow</a>) to
                        specify how data is gathered from or distributed among multiple
                        functions, and built-in constraint element-index
                        to specify a subset of a data collection.
                        <pre><code class="language-yaml">function: {
  name: "name",
  type: "type",
  dataIns: [
    {
      name: "name" , type: "type",
      source: "source"? , value: "value"? ,
      properties: [{ name: "name" , value: "value" }+]?,
      constraints: [{ name: "name" , value: "value" }+]?
    }+
  ]?,
  properties: [{ name: "name" , value: "value" }+]?,
  constraints: [{ name: "name" , value: "value" }+]?,
  dataOuts: [
    {
      name: "name" , type: "type" , saveto: "saveto"? ,
      properties: [{ name: "name" , value: "value" }+]?,
      constraints: [{ name: "name" , value: "value" }+]?
    }+
  ]?
}
</code></pre>
                    </section></br>
<section id="dataflow">
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
    of a set of functions and include them in a collection (e.g. a
    consumer of message queues or stream-processing tools) for
    further processing by subsequent functions. Collections are also
    well suited to exploit data parallelism by distributing collection
    data elements to loop iterations or parallel sections. Collections
    may contain a static or dynamic number (unknown at the time
    when an FC is composed but not yet executed) of data elements.
    In order to support this feature as part of AFCL, we introduce the
    concept of a data collection . The elements of a data collec-
    tion are of JSON datatypes and they can be distributed onto base
    and compound functions. The data port with type collection
    represents a list of data elements provided by the user as the ini-
    tial input of an FC or produced by FC functions as an intermediate
    result
    <div id="element-index">
<h2>ELEMENT_INDEX</h2>
Subsets of data collections can be specified by using the build-in
constraint <a class="highlight">element-index</a>. With
<a class="highlight">index</a>, the developer can specify certain positions of
the data collection.
<pre><code class="language-yaml">constraits: [
    { name: "element-index" , value: "<span>&#60;</span>index<span>&#62;</span>" }
]
</code></pre>
The value of element-index is a list of
comma separated expressions. Note that in the absence of the
type element-index, the entire data collection is specified.
The following grammar specifies the syntax of the construct
element-index, where <code class="w3-codespan inline">e</code> denotes the element index, <code class="w3-codespan inline">c</code> a colon
expression, <code class="w3-codespan inline">s1</code> the start index, <code class="w3-codespan inline">s2</code> the end index,
and <code class="w3-codespan inline">s3</code> a stride.
</br>
<code class="w3-codespan inline">e ::= c [, c ]∗</code>
</br>
<code class="w3-codespan inline">c ::= s1 [: s2 [: s3 ]]</code>
</br>
Such an expression can refer to either a specific index or a
range of indexes with an optional stride.
</br></br>
Example for index <code class="w3-codespan inline">1,2:6:2</code>:
</br>
<img style="width: 70%" src="assets/dps_learn/figures/element-index.png" alt="element-index">
</div>
                    </section>
<section id="distributionConstraints">
                        <h1>Distribution constraints</h1>
Most existing FC systems mainly replicate collected data to
multiple functions or loop iterations without supporting the concept
of data distributions. This inefficient data transfer between
functions may initiate a considerable delay in function invocation
time. AFCL offers additional, build-in, distribution constraints,
which allow the developer to specify how data elements of a collection
will be distributed across successor functions. AFCL introduces the follwing
distribution constraints: <a class="highlight">block</a> and
<a class="highlight">replicate</a>.
 <div id="block">
<h2>BLOCK</h2>
Using the built-in constraint <a class="highlight">distribution</a> and specifying the <a class="highlight">BLOCK</a>-based data distribution,
optionally in combination with <a class="highlight">size</a> and <a class="highlight">overlap</a>,
a data collection is partitioned in contiguous blocks of a specific
length and distributed to the different successor functions or
different loop iterations.
<pre><code class="language-yaml">constraits: [
    { name: "distribution" , value: "BLOCK(<span>&#60;</span>size<span>&#62;</span>, <span>&#60;</span>overlap<span>&#62;</span>)" }
]
</code></pre>
Example for <code class="w3-codespan inline">BLOCK(4,2)</code>:
</br>
<img style="width: 70%" src="assets/dps_learn/figures/block.png" alt="Italian Trulli">
</div>
<div id="replicate">
<h2>REPLICATE</h2>
Another option is to replicate a certain
dataOuts port and then distribute to the different successor
functions. AFCL allows data replication by specifying the constraint
<a class="highlight">distribution</a> in combination with <a class="highlight">REPLICATE</a>, as well
as the number of replications (<a class="highlight">times</a>).
<pre><code class="language-yaml">constraits: [
    { name: "distribution" , value: "REPLICATE(<span>&#60;</span>times<span>&#62;</span>)" }
]
</code></pre>
The elements of a data collection will be replicated a specific number
of times to the successor functions or to different loop iterations.
The dataIn and dataOut ports of each construct can be of type collection in order to collect the data
produced by a loop iteration, a parallel section or any other function.
After all loop iterations finished, all dataOuts are written
into the dataOuts of the parallelFor, parallel, while and
for construct, which is of type collection and can be accessed
by subsequent functions.
</br></br>
<div class="info">
    <strong>Info!</strong>
If both, element-index and distribution
are specified within the same data port, element-index
has higher precedence.
</div>
Example for <code class="w3-codespan inline">REPLICATE(2)</code>:
</br>
<img style="width: 70%" src="assets/dps_learn/figures/replicate.png" alt="Italian Trulli">
</div>
                        <h4>Example</h4>
The following example shows the usage of <a class="highlight">BLOCK</a>, <a class="highlight">REPLICATE</a> and
<a class="highlight">element-index</a> in a parallelFor.
<ul>
    <li>The first input to the parallelFor is of type <a class="highlight">number</a>, coming from another function. This input is used to
        determine the number of parallel loop iterations specified in the <a class="highlight">loopCounter</a>'s <a class="highlight">to</a>
        attribute.</li>
    <li>The second input of type <a class="highlight">collection</a>, which is distributed across the loop iterations with
        <code class="w3-codespan inline">BLOCK(1)</code>. This specification means that each iteration gets one element of the collection. Let
        us assume the collection looks as follows: <code class="w3-codespan inline">[0, 1, 2, 3]</code>. Each iteration would get one element of
        the array, e.g. the first iteration gets <code class="w3-codespan inline">0</code> which is of type <a class="highlight">number</a> as specified in
        the first input (<a class="highlight">employeeID</a>) of the function <a class="highlight">assignEmployee</a>.</li>
    <li>The third input is again of type <a class="highlight">collection</a>. Let us assume the collection looks as follows:
        <code class="w3-codespan inline">["1S3DF2", "7G3UU8"]</code>. The <a class="highlight">distribution</a> specified
        within this input is <code class="w3-codespan inline">REPLICATE(2)</code>, meaning that the first two iterations get
        <code class="w3-codespan inline">"1S3DF2"</code> which is of type <a class="highlight">string</a> (as specified in the
        <a class="highlight">employeeStatus</a> input of the <a class="highlight">assignEmployee</a> function). The third and fourth
        iteration of the loop get <code class="w3-codespan inline">"7G3UU8"</code>.</li>
    <li>The fourth input will be distributed across the iterations using <code class="w3-codespan inline">BLOCK(4,2)</code>. Let
        us assume the collection looks as follows: <code class="w3-codespan inline">[0, 1, 2, 3, 4, 5, 6, 7]</code>. Then, the
        first iteration would get <code class="w3-codespan inline">[0, 1, 2, 3]</code>, the second would get
        <code class="w3-codespan inline">[2, 3, 4, 5]</code>, etc. All of them are of type <a class="highlight">collection</a>.</li>
    <li>The fifth and last input uses the <code class="w3-codespan inline">element-index</code> constraint. Let us assume we
        have the following collection: <code class="w3-codespan inline">[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]</code>. Specifying
        <code class="w3-codespan inline">element-index</code> as index would result in the following collection:
        <code class="w3-codespan inline">[1, 2, 4, 6, 8, 10]</code>, which is the same for all iterations in the parallelFor.</li>
</ul>
<pre><code class="language-yaml">parallelFor: {
   name: "iterateAllEmployees",
   dataIns: [
     { name: "totalEmployees" , type: "number" , source: "otherFunction/numEmployees" },
     { name: "employeeIds" , type: "collection" , source: "otherFunction/employeeIds" ,
       constraints: [{ name: "distribution" , value: "BLOCK(1)" }] },
     { name: "employeeStatus" , type: "collection" , source: "otherFunction/status" ,
       constraints: [{ name: "distribution" , value: "REPLICATE(2)" }] },
     { name: "taskList1" , type: "collection" , source: "otherFunction/tasks" ,
       constraints: [{ name: "distribution" , value: "BLOCK(4,2)" }] },
     { name: "taskList2" , type: "collection" , source: "anotherFunction/tasks" ,
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
         { name: "tasks1" , type: "collection" , source: "iterateAllEmployees/taskList1" },
         { name: "tasks2" , type: "collection" , source: "iterateAllEmployees/taskList2" }
       ]
     }
   ]
 }
</code></pre>
</section>
                    <section id="illegaldataflow">
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
within the compound construct. In addition, if no <a class="highlight">else</a> branch,
or no <a class="highlight">default</a> case is defined, the list must also contain a <code class="w3-codespan inline">NULL</code>
element, which indicates that no data is available in that case.
<img style="width: 50%" src="assets/dps_learn/figures/illegaldataflow.JPG" alt="illegal dataflow">
                                        </section>
<section id="events">
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
        start: "dd-MM-yyyy HH:mm:ss"?,
        end: "dd-MM-yyyy HH:mm:ss"?,
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
                    </section>
 <section id="invoketype">
                        <h1>Invocation type</h1>
                        The <a class="highlight">invoke-type</a> is a built-in property defined in AFCL. This Property can be
                        used to specify whether a base function should run
                        asynchronously (<code class="w3-codespan inline">ASYNC</code>) or synchronously
                        (<code class="w3-codespan inline">SYNC</code>). An invoker of a synchronous
                        function waits for the function to finish (if the function has output data then
                        until the data arrived). With asynchronous invocation, the function will be
                        queued without waiting for the function to be finished. For example, the runtime
                        system can invoke a synchronous ”checker” function periodically to examine
                        whether the output of an asynchronous function is stored in a specified storage
                        (e.g. S3).
                        By default, if the invoke-type property is defined within a compound function,
                        all nested base functions within that compound function will inherit this
                        property and are invoked with the specified invoke-type. Otherwise, the base
                        function will be invoked as specified invoke-type property. If <code class="w3-codespan inline">ASYNC</code> is specified,
                        the FC designer must guarantee that the FC still operates correctly. Without
                        specifying any invoke-type in any of the parent compound functions, the base
                        functions are executed synchronously in AFCL.
                        The build-in function <a class="highlight">asyncHandler</a> is used to handle <code class="w3-codespan inline">ASYNC</code> invoked functions.
                        This function can be used the same way as a base function is used, while
                        the type field specifies that it is a build-in function. The build-in function
                        has one input parameter, representing a coma separated list of names of <code class="w3-codespan inline">ASYNC</code>
                        invoked functions (e.g. FunctionName1) and one boolean output parameter
                        which represents whether all of these invoked functions finished. asyncHandler
                        can be invoked with invoke-type
                        <ul>
                            <li><code class="w3-codespan inline">ASYNC</code>, meaning that asyncHandler immediately
                                                        returns with the output parameter set to true if all functions (specified
                                                        in the input parameter) finished otherwise it is set to false, or </li>
                            <li><code class="w3-codespan inline">SYNC</code>,
                                                        meaning that asyncHandler waits for all functions (specified in the input parameter)
                                                        to finish before it returns</li>
                        </ul>
                        <pre><code class="language-yaml">function: {
  name: "name" , type: "build-in:asyncHandler",
  dataIns: [
    { name: "name" , type: "collection" , value: "FunctionName1,FunctionName2,...,FunctionNameN" }
  ],
  properties: [
    { name: "invoke-type" , value: "ASYNC | SYNC" }
  ]?,
  dataOuts: [
    { name: "name" , type: "boolean" }
  ]
}
</code></pre>
                    </section>
        </div>
</div>
`);
